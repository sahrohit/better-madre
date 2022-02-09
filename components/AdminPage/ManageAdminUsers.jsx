import {
	Button,
	FormControl,
	Heading,
	Input,
	HStack,
	Avatar,
	IconButton,
	useToast,
	Text,
	useColorMode,
	VStack,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Tag,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "contexts/AuthContext";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useRef } from "react";
import {
	collection,
	doc,
	setDoc,
	onSnapshot,
	deleteDoc,
	getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";

const ManageAdminUsers = () => {
	const toast = useToast();
	const [admin, setAdmin] = useState(null);
	const [loading, setLoading] = useState(true);
	const AdminUsersSchema = Yup.object().shape({
		newadminuid: Yup.string().required("Required"),
	});

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
				{admin.map((uid) => (
					<ProfileCard key={uid} uid={uid} />
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

const ProfileCard = ({ uid }) => {
	const toast = useToast();
	const { colorMode } = useColorMode();
	const { currentUser } = useAuth();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const cancelButtonRef = useRef();

	const [confirmInput, setConfirmInput] = useState("");

	const [user, setUser] = useState();

	useEffect(() => {
		const getUserData = async () => {
			try {
				const docSnap = await getDoc(doc(db, "users", uid));
				setUser(docSnap.data());
			} catch (error) {
				console.log(error);
			}
		};
		getUserData();
	}, [uid]);

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
			<Avatar name={user?.displayName} src={user?.photoURL} />
			<VStack align={"left"}>
				<HStack justifyContent={"space-between"}>
					<VStack align={"left"}>
						<Heading fontSize="xl" fontWeight={"normal"}>
							{user?.displayName}
						</Heading>
						<Text fontSize="sm">{uid}</Text>
					</VStack>
					<IconButton
						color="red.500"
						size="sm"
						aria-label="Delete"
						icon={<CloseIcon />}
						onClick={() => setIsDialogOpen(true)}
					/>

					<AlertDialog
						isOpen={isDialogOpen}
						leastDestructiveRef={cancelButtonRef}
						onClose={() => setIsDialogOpen(false)}
					>
						<AlertDialogOverlay>
							<AlertDialogContent>
								<AlertDialogHeader
									fontSize="lg"
									fontWeight="bold"
								>
									Revoke Admin Access
								</AlertDialogHeader>

								<AlertDialogBody>
									Type <Tag>revoke</Tag> to confirm.
									<FormControl>
										<Input
											my={2}
											placeholder="revoke"
											onChange={(e) =>
												setConfirmInput(e.target.value)
											}
										/>
									</FormControl>
								</AlertDialogBody>

								<AlertDialogFooter>
									<Button
										ref={cancelButtonRef}
										onClick={() => setIsDialogOpen(false)}
									>
										Cancel
									</Button>

									<Button
										isDisabled={confirmInput !== "revoke"}
										colorScheme="red"
										onClick={async () => {
											if (uid === currentUser.uid) {
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
													await deleteDoc(
														doc(db, "admin", uid)
													);
													toast({
														title: `Deleted Successfully`,
														description:
															`All permission are revoked for ${user?.displayName}.`,
														status: "success",
														duration: 4000,
														isClosable: true,
													});
												} catch (error) {
													toast({
														title: `An Error Occured`,
														description:
															error.message,
														status: "success",
														duration: 4000,
														isClosable: true,
													});
												}
											}
											setIsDialogOpen(false);
										}}
										ml={3}
									>
										Delete
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialogOverlay>
					</AlertDialog>
				</HStack>
			</VStack>
		</HStack>
	);
};
