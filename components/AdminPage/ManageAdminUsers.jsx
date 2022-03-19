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
	FormErrorMessage,
	useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "contexts/AuthContext";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useRef } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useAdmin } from "@contexts/AdminContext";
import { AiOutlineUserAdd } from "react-icons/ai";
import { nanoid } from "nanoid";

const ManageAdminUsers = () => {
	const { users, uids, admins } = useAdmin();
	const toast = useToast();
	const [confirmInput, setConfirmInput] = useState("");
	const cancelButtonRef = useRef();
	const [newAdminUid, setNewAdminUid] = useState("");
	const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);

	const AdminUsersSchema = Yup.object().shape({
		newadminuid: Yup.string()
			.required("Required")
			.oneOf(uids, "Not a valud Userid")
			.notOneOf(admins, "Already an Admin"),
	});

	return (
		<VStack
			spacing={2}
			m={6}
			p={6}
			justify={"flex-start"}
			alignItems={"center"}
		>
			<Heading variant={"emphasis"} fontFamily={"Parisienne"}>
				Manage Admins
			</Heading>

			<VStack w={"full"}>
				{admins.map((uid) => (
					<ProfileCard key={uid} uid={uid} />
				))}
			</VStack>

			<Formik
				validateOnChange={false}
				validateOnBlur={false}
				initialValues={{ newadminuid: "" }}
				validationSchema={AdminUsersSchema}
				onSubmit={async (values, actions) => {
					setIsAddAdminDialogOpen(true);
					setNewAdminUid(values.newadminuid);
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
										<AutoComplete rollNavigation>
											<HStack spacing={2}>
												<AutoCompleteInput
													{...field}
													id="newadminuid"
													placeholder="User Id or Search Name"
													autoFocus
													autoComplete="off"
													variant="outline"
												/>
												<IconButton
													fontSize={"xl"}
													colorScheme={"teal"}
													type="submit"
													icon={<AiOutlineUserAdd />}
												/>
											</HStack>
											<AutoCompleteList>
												{users.map((user, oid) => (
													<AutoCompleteItem
														key={user.uid}
														value={user.displayName}
														textTransform="capitalize"
														align="center"
														onClick={() => {
															form.setFieldValue(
																"newadminuid",
																user.uid
															);
														}}
														my={1}
													>
														<Avatar
															size="sm"
															name={
																user.displayName
															}
															src={user.photoURL}
														/>
														<Text ml="4">
															{user.displayName}
														</Text>
													</AutoCompleteItem>
												))}
											</AutoCompleteList>
										</AutoComplete>

										<FormErrorMessage>
											{form.errors.newadminuid}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						</HStack>
						<AlertDialog
							isOpen={isAddAdminDialogOpen}
							leastDestructiveRef={cancelButtonRef}
							onClose={() => setIsAddAdminDialogOpen(false)}
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
										Type <Tag>confirm</Tag> to confirm.
										<FormControl>
											<Input
												autoComplete="off"
												my={2}
												placeholder="confirm"
												onChange={(e) =>
													setConfirmInput(
														e.target.value
													)
												}
											/>
										</FormControl>
									</AlertDialogBody>

									<AlertDialogFooter>
										<Button
											ref={cancelButtonRef}
											onClick={() =>
												setIsAddAdminDialogOpen(false)
											}
										>
											Cancel
										</Button>

										<Button
											isDisabled={
												confirmInput !== "confirm"
											}
											colorScheme="green"
											ml={3}
											onClick={async () => {
												try {
													await setDoc(
														doc(
															db,
															"admin",
															newAdminUid
														),
														{}
													);
													toast({
														title: `Added New Admin!`,
														description: `One more to the team. 🎉`,
														status: "success",
														duration: 4000,
														isClosable: true,
													});
													setIsAddAdminDialogOpen(
														false
													);
												} catch (error) {}
											}}
										>
											Add
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialogOverlay>
						</AlertDialog>
					</Form>
				)}
			</Formik>
		</VStack>
	);
};

export default ManageAdminUsers;

const ProfileCard = ({ uid }) => {
	const toast = useToast();
	const { currentUser } = useAuth();

	const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);
	const cancelButtonRef = useRef();

	const [confirmInput, setConfirmInput] = useState("");

	const [user, setUser] = useState();

	useEffect(() => {
		const getUserData = async () => {
			try {
				const docSnap = await getDoc(doc(db, "users", uid));
				setUser(docSnap.data());
			} catch (error) {}
		};
		getUserData();
	}, [uid]);

	return (
		<HStack
			bg={useColorModeValue("white", "#1a1b1e")}
			rounded={"lg"}
			shadow={"lg"}
			p={4}
			width={"full"}
			justify={"flex-start"}
			alignItems={"center"}
			direction={"column"}
		>
			<Avatar name={user?.displayName} src={user?.photoURL} />
			<VStack align={"left"} w={"full"}>
				<HStack justifyContent={"space-between"}>
					<VStack align={"left"}>
						<Heading fontSize="xl" fontWeight={"normal"}>
							{user?.displayName}
						</Heading>
						<Text color="gray.500" fontSize="sm">
							{uid}
						</Text>
					</VStack>
					<IconButton
						color="red.500"
						size="sm"
						aria-label="Delete"
						icon={<CloseIcon />}
						onClick={() => setIsRevokeDialogOpen(true)}
					/>

					<AlertDialog
						isOpen={isRevokeDialogOpen}
						leastDestructiveRef={cancelButtonRef}
						onClose={() => setIsRevokeDialogOpen(false)}
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
											autoComplete="off"
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
										onClick={() =>
											setIsRevokeDialogOpen(false)
										}
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
														description: `All permission are revoked for ${user?.displayName}.`,
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
											setIsRevokeDialogOpen(false);
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
