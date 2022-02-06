import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	HStack,
	Avatar,
	AvatarBadge,
	IconButton,
	Center,
	useToast,
	Text,
	Badge,
	Stat,
	StatLabel,
	StatHelpText,
	StatNumber,
	SimpleGrid,
	InputGroup,
	InputRightElement,
	Link as ChakraLink,
	useColorMode,
	VStack,
	Box,
	Divider,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	getDocs,
	deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";

const ManageAdminUsers = () => {
	const AdminUsersSchema = Yup.object().shape({
		newadminuid: Yup.string().required("Required"),
	});

	const [admin, setAdmin] = useState(null);
	const [loading, setLoading] = useState(true);

	const toast = useToast();

	const { currentUser } = useAuth();

	const writeToDatabase = async () => {
		await setDoc(doc(db, "admin", "apple"), {});
	};

	useEffect(
		() =>
			onSnapshot(collection(db, "admin"), (snapshot) => {
				setAdmin(snapshot.docs.map((doc) => doc.id));
				setLoading(false);
			}),
		[]
	);

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<VStack
			spacing={2}
			m={6}
			p={6}
			justify={"flex-start"}
			alignItems={"center"}
		>
			<Heading variant={"emphasis"}>Admins</Heading>

			<VStack>
				{admin.map((user) => (
					<ProfileCard key={user} user={user} />
				))}
			</VStack>

			<Formik
				initialValues={{ newadminuid: "" }}
				validationSchema={AdminUsersSchema}
				onSubmit={async (values, actions) => {
					try {
						await setDoc(doc(db, "admin", values.newadminuid), {});
						toast({
							title: `Added New Admin!`,
							description: `One more to the team. 🎉`,
							status: "success",
							duration: 4000,
							isClosable: true,
						});
					} catch (error) {}
				}}
			>
				{(props) => (
					<Form>
						<HStack width={"100%"}>
							<Field name="newadminuid">
								{({ field, form }) => (
									<FormControl
										isInvalid={
											form.errors.newadminuid &&
											form.touched.newadminuid
										}
									>
										<Input {...field} id="newadminuid" />
									</FormControl>
								)}
							</Field>
							<Button
								mt={4}
								colorScheme={"green"}
								isLoading={props.isSubmitting}
								type="submit"
							>
								Add
							</Button>
						</HStack>
					</Form>
				)}
			</Formik>
		</VStack>
	);
};

export default ManageAdminUsers;

const ProfileCard = ({ user }) => {
	const toast = useToast();
	const { colorMode } = useColorMode();
	const { currentUser } = useAuth();

	return (
		<HStack
			p={4}
			width={"100%"}
			justify={"flex-start"}
			alignItems={"center"}
			direction={"column"}
			border="1px"
			borderRadius="12px"
			borderColor={colorMode == "light" ? `gray.200` : `whiteAlpha.300`}
		>
			<Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
			<VStack align={"left"}>
				<HStack justifyContent={"space-between"}>
					<Heading as="h2" size="md">
						{currentUser.displayName}
					</Heading>
					<IconButton
						color="red.500"
						size="sm"
						aria-label="Delete"
						icon={<CloseIcon />}
						onClick={async () => {
							if (user === currentUser.uid) {
								toast({
									title: `Can't delete yourself`,
									description:
										"You cannot remove yourself from the admin list",
									status: "error",
									duration: 4000,
									isClosable: true,
								});
							} else {
								try {
									await deleteDoc(doc(db, "admin", user));
									toast({
										title: `Deleted Successfully`,
										description:
											"All permission are revoked.",
										status: "success",
										duration: 4000,
										isClosable: true,
									});
								} catch (error) {
									toast({
										title: `An Error Occured`,
										description: error.message,
										status: "success",
										duration: 4000,
										isClosable: true,
									});
								}
							}
						}}
					/>
				</HStack>
				<Text fontSize="lg">{user}</Text>
			</VStack>
		</HStack>
	);
};
