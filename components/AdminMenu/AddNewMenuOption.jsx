import React, { useRef } from "react";
import {
	HStack,
	Button,
	useDisclosure,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
	FormControl,
	Input,
	FormLabel,
	FormErrorMessage,
	Stack,
	Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAdmin } from "@contexts/AdminContext";
import { useRouter } from "next/router";

const AddNewMenuOption = ({ showDelete, setShowDelete }) => {
	const {
		isOpen: isConfirmCreateNewOpen,
		onOpen: onConfirmCreateNewOpen,
		onClose: onConfirmCreateNewClose,
	} = useDisclosure();
	const cancelConfirmCreateNewRef = useRef();

	const { adminMenu, addNewMenuItem } = useAdmin();

	const menuNameList = adminMenu.map((item) => item.menuname.toLowerCase());
	const menuIdList = adminMenu.map((item) => item.menuId);
	const CreateNewMenuSchema = Yup.object().shape({
		menuname: Yup.string()
			.required("Required")
			.lowercase()
			.notOneOf(menuNameList, "Menu Name already exists")
			.min(3, "Too Short!"),
		menuId: Yup.string()
			.required("Required")
			.notOneOf(menuIdList, "Menu Id already exists"),
	});

	const router = useRouter();

	return (
		<HStack spacing={2} my={4} justifyContent={"space-between"}>
			<Button
				variant="outline"
				size="sm"
				borderColor={!showDelete ? "red" : "green"}
				colorScheme={!showDelete ? "red" : "green"}
				onClick={() => {
					setShowDelete(!showDelete);
				}}
			>
				{showDelete ? "Cancel" : "Delete"}
			</Button>
			<Button
				size="sm"
				colorScheme={"blue"}
				onClick={onConfirmCreateNewOpen}
			>
				Create New
			</Button>
			<AlertDialog
				preserveScrollBarGap
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelConfirmCreateNewRef}
				onClose={onConfirmCreateNewClose}
				isOpen={isConfirmCreateNewOpen}
			>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<Formik
						initialValues={{
							menuname: "",
							menuId: "",
						}}
						validateOnChange={true}
						validationSchema={CreateNewMenuSchema}
						onSubmit={async (values, actions) => {
							addNewMenuItem(values.menuname, values.menuId).then(
								() => {
									actions.setSubmitting(false);
									router.push(
										`/admin/menu/edit?id=${values.menuId}`
									);
								}
							);
						}}
					>
						{(props) => (
							<Form>
								<AlertDialogHeader>
									Create New Menu Item?
								</AlertDialogHeader>
								<AlertDialogCloseButton />
								<AlertDialogBody>
									<Field name="menuname">
										{({ field, form }) => (
											<FormControl
												isRequired
												isInvalid={
													form.errors.menuname &&
													form.touched.menuname
												}
											>
												<Stack
													direction={{
														base: "column",
														sm: "row",
													}}
													align={"start"}
													justify={"space-between"}
												>
													<FormLabel>
														Menu Name:
													</FormLabel>
													<FormErrorMessage>
														{form.errors.menuname}
													</FormErrorMessage>

													{!props.errors.menuname &&
														props.values.menuname
															.length >= 3 && (
															<Text color="green.500">
																Menu Name is
																Valid
															</Text>
														)}
												</Stack>
												<Input
													{...field}
													autoComplete="off"
												/>
											</FormControl>
										)}
									</Field>

									<Field name="menuId">
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.menuId &&
													form.touched.menuId
												}
											>
												<Stack
													mt={4}
													direction={{
														base: "column",
														sm: "row",
													}}
													align={"start"}
													justify={"space-between"}
												>
													<FormLabel>
														Menu Id:
													</FormLabel>

													<FormErrorMessage>
														{form.errors.menuId}
													</FormErrorMessage>

													{!props.errors.menuId &&
														props.values.menuId
															.length >= 3 && (
															<Text color="green.500">
																Menu Id is Valid
															</Text>
														)}
												</Stack>
												<Input
													{...field}
													value={
														(props.values.menuId =
															encodeURI(
																form.values.menuname
																	.toLowerCase()

																	.replace(
																		/ /g,
																		"-"
																	)
																	.replace(
																		/[!"#$%&'()*+,./:;<=>?@[\]^_`’{|}~]/g,
																		""
																	)
															))
													}
												/>
											</FormControl>
										)}
									</Field>
								</AlertDialogBody>
								<AlertDialogFooter>
									<Button
										colorScheme="red"
										variant={"outline"}
										ref={cancelConfirmCreateNewRef}
										onClick={onConfirmCreateNewClose}
									>
										Discard
									</Button>
									<Button
										isLoading={props.isSubmitting}
										type="submit"
										colorScheme="green"
										ml={3}
									>
										Create
									</Button>
								</AlertDialogFooter>
							</Form>
						)}
					</Formik>
				</AlertDialogContent>
			</AlertDialog>
		</HStack>
	);
};

export default AddNewMenuOption;
