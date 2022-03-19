import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import {
	doc,
	updateDoc,
	onSnapshot,
	arrayUnion,
	collection,
	addDoc,
	setDoc,
	getDocs,
	deleteField,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
	Container,
	Stack,
	Image,
	VStack,
	Button,
	SimpleGrid,
	IconButton,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Textarea,
	InputGroup,
	InputRightElement,
	HStack,
	useToast,
	InputRightAddon,
	Heading,
	Text,
	Checkbox,
	useClipboard,
	Tooltip,
	VisuallyHiddenInput,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	CircularProgressLabel,
	CircularProgress,
	Progress,
	Center,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { CheckIcon, CloseIcon, CopyIcon } from "@chakra-ui/icons";
import { useAdmin } from "@contexts/AdminContext";
import AdminProductImage from "./AdminProductImage";
import {
	ref,
	uploadString,
	getDownloadURL,
	deleteObject,
	uploadStringReusable,
	uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";

const MenuSchema = Yup.object().shape({
	menuname: Yup.string().required("Required"),
	badges: Yup.array().of(Yup.string().required("Required")),
	category: Yup.string().required("Required"),
	cusine: Yup.string().required("Required"),
	price: Yup.number().required("Required"),
	description: Yup.string().required("Required"),
	features: Yup.array().of(Yup.string().required("Required")),
	recipe: Yup.array().of(Yup.string().required("Required")),
	images: Yup.array().of(
		Yup.object()
			.shape({
				imageURL: Yup.string().required("Required"),
				imageRef: Yup.string(),
			})
			.required("Required")
	),
	isPublished: Yup.boolean().required("Required"),
});

const AdminProductPage = ({ id }) => {
	const toast = useToast();
	const router = useRouter();
	const { adminMenu } = useAdmin();
	const item = adminMenu.find((menu) => menu.menuId === id);
	const { hasCopied: hasMenuIdCopied, onCopy: onMenuIdCopy } = useClipboard(
		item?.menuId,
		5000
	);

	const {
		isOpen: isUploadFileModalOpen,
		onOpen: onUploadFileModalOpen,
		onClose: onUploadFileModalClose,
	} = useDisclosure();

	const [fileUploadProgress, setFileUploadProgress] = useState(0);
	const [selectedFile, setSelectedFile] = useState();

	if (!item) {
		router.push("/admin/menu").then(() => {
			if (!toast.isActive("admin-menu-not-found")) {
				toast({
					id: "admin-menu-not-found",
					title: "Error",
					description: "Menu not found",
					status: "error",
					duration: 3000,
				});
			}
		});

		return <FullPageLoadingSpinner />;
	}

	return (
		<Formik
			initialValues={{
				menuname: item.menuname,
				menuId: item.menuId,
				badges: item.badges,
				category: item.category,
				cusine: item.cusine,
				price: item.price,
				description: item.description,
				features: item.features,
				recipe: item.recipe,
				images: item.images,
				isPublished: item.isPublished,
			}}
			validationSchema={MenuSchema}
			validateOnChange={false}
			onSubmit={async (values, actions) => {
				try {
					await updateDoc(doc(db, "menu", id), {
						...values,
					});
					toast({
						title: `Menu Details Updated!`,
						description: `${item.menuname} has been updated!`,
						status: "success",
						duration: 4000,
						isClosable: true,
					});
					actions.setSubmitting(false);
				} catch (error) {
					toast({
						title: `An Error Occured`,
						description: error.message,
						status: "error",
						duration: 4000,
						isClosable: true,
					});
					actions.setSubmitting(false);
				}
			}}
		>
			{(props) => (
				<Form>
					<Container maxW={"7xl"} py={{ base: 12, md: 16 }}>
						<VStack spacing={1} align={"left"} my={5}>
							<Heading fontWeight={"normal"}>
								{item.menuname}
							</Heading>
						</VStack>
						<SimpleGrid
							columns={{ base: 1, lg: 2 }}
							spacing={{ base: 8, md: 10 }}
						>
							<VStack spacing={6}>
								<AdminProductImage
									images={props.values.images?.map(
										(image) => image.imageURL
									)}
								/>

								<FieldArray
									name="images"
									render={(arrayHelpers) => (
										<>
											<Stack
												w={"full"}
												direction={{
													base: "column",
													sm: "row",
												}}
												align={"start"}
												justify={"space-between"}
											>
												<FormLabel>Images</FormLabel>

												<HStack>
													<Button
														size="xs"
														colorScheme="green"
														onClick={() =>
															arrayHelpers.insert(
																props.values
																	.images
																	.length,
																{
																	imageURL:
																		"",
																	imageRef:
																		"",
																}
															)
														}
													>
														Add
													</Button>
													<Button
														size="xs"
														colorScheme="green"
														onClick={
															onUploadFileModalOpen
														}
													>
														Upload
													</Button>

													<Modal
														preserveScrollBarGap
														isOpen={
															isUploadFileModalOpen
														}
														onClose={
															onUploadFileModalClose
														}
													>
														<ModalOverlay />
														<ModalContent>
															<ModalHeader>
																Upload a File
															</ModalHeader>
															<ModalCloseButton />
															<ModalBody>
																<Input
																	type="file"
																	onChange={(
																		e
																	) =>
																		setSelectedFile(
																			e
																				.target
																				.files[0]
																		)
																	}
																	border={0}
																/>
																<Progress
																	hasStripe
																	value={
																		fileUploadProgress
																	}
																/>
															</ModalBody>

															<ModalFooter>
																<Button
																	colorScheme="red"
																	variant={
																		"outline"
																	}
																	mr={3}
																	onClick={
																		onUploadFileModalClose
																	}
																>
																	Close
																</Button>
																<Button
																	colorScheme={
																		"green"
																	}
																	onClick={async () => {
																		const imageRef = `images/menu/${
																			item.menuId
																		}/image${nanoid()}`;
																		const uploadTask =
																			uploadBytesResumable(
																				ref(
																					storage,
																					imageRef
																				),
																				selectedFile
																			);

																		uploadTask.on(
																			"state_changed",
																			(
																				snapshot
																			) => {
																				setFileUploadProgress(
																					Math.round(
																						(snapshot.bytesTransferred /
																							snapshot.totalBytes) *
																							100
																					)
																				);
																			},
																			(
																				error
																			) =>
																				toast(
																					{
																						title: "An Error Occurred",
																						description:
																							error.message,
																						status: "error",
																						duration: 5000,
																						isClosable: true,
																					}
																				),
																			async () => {
																				await getDownloadURL(
																					ref(
																						storage,
																						imageRef
																					)
																				).then(
																					(
																						downloadURL
																					) => {
																						arrayHelpers.insert(
																							props
																								.values
																								.images
																								.length,
																							{
																								imageURL:
																									downloadURL,
																								imageRef:
																									imageRef,
																							}
																						);
																						onUploadFileModalClose();
																					}
																				);
																			}
																		);
																	}}
																>
																	Upload
																</Button>
															</ModalFooter>
														</ModalContent>
													</Modal>
												</HStack>
											</Stack>
											<SimpleGrid w={"full"} spacing={2}>
												{props.values.images &&
												props.values.images.length >
													0 ? (
													props.values.images.map(
														(image, index) => (
															<Field
																key={index}
																name={`images.${index}.imageURL`}
															>
																{({
																	field,
																	form,
																}) => (
																	<FormControl
																		isInvalid={
																			form
																				.errors
																				.images?.[
																				index
																			] &&
																			form
																				.touched
																				.images?.[
																				index
																			]
																		}
																	>
																		<InputGroup>
																			<Input
																				{...field}
																				type="text"
																			/>
																			<InputRightElement
																				zIndex={
																					0
																				}
																				width="4.5rem"
																			>
																				<IconButton
																					ml={
																						5
																					}
																					color="red.500"
																					size="sm"
																					aria-label="Delete"
																					icon={
																						<CloseIcon />
																					}
																					onClick={async () => {
																						arrayHelpers.remove(
																							index
																						);
																						if (
																							image.imageRef
																						) {
																							await deleteObject(
																								ref(
																									storage,
																									image.imageRef
																								)
																							);
																						}
																					}}
																				/>
																			</InputRightElement>
																		</InputGroup>
																	</FormControl>
																)}
															</Field>
														)
													)
												) : (
													<Button
														type="button"
														onClick={() =>
															arrayHelpers.push({
																imageURL: "",
																imageRef: "",
															})
														}
													>
														Add a Image
													</Button>
												)}
											</SimpleGrid>
										</>
									)}
								/>
							</VStack>

							<Stack spacing={4} w={"full"}>
								<Stack
									direction={{
										base: "column",
										lg: "row",
									}}
								>
									<Field name="price">
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.price &&
													form.touched.price
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
													<FormLabel>Price</FormLabel>
													<FormErrorMessage>
														{form.errors.price}
													</FormErrorMessage>
												</Stack>
												<InputGroup>
													<Input
														{...field}
														type="number"
													/>
													<InputRightAddon
														bg={"grey.500"}
													>
														paisa
													</InputRightAddon>
												</InputGroup>
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
													direction={{
														base: "column",
														sm: "row",
													}}
													align={"start"}
													justify={"space-between"}
												>
													<FormLabel>
														Menu Id
													</FormLabel>
													<FormErrorMessage>
														{form.errors.menuId}
													</FormErrorMessage>
												</Stack>

												<InputGroup>
													<Input
														isDisabled
														{...field}
														type="text"
													/>
													<InputRightElement
														zIndex={0}
														width="4.5rem"
													>
														<Tooltip
															closeOnClick={false}
															label={
																hasMenuIdCopied
																	? "✔ Copied"
																	: "Copy"
															}
														>
															<IconButton
																ml={5}
																color="green.500"
																size="sm"
																aria-label="Delete"
																icon={
																	hasMenuIdCopied ? (
																		<CheckIcon />
																	) : (
																		<CopyIcon />
																	)
																}
																onClick={
																	onMenuIdCopy
																}
															/>
														</Tooltip>
													</InputRightElement>
												</InputGroup>
											</FormControl>
										)}
									</Field>
								</Stack>
								<Stack
									direction={{
										base: "column",
										lg: "row",
									}}
								>
									<Field name="category">
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.category &&
													form.touched.category
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
														Category
													</FormLabel>
													<FormErrorMessage>
														{form.errors.category}
													</FormErrorMessage>
												</Stack>

												<Input {...field} type="text" />
											</FormControl>
										)}
									</Field>

									<Field name="cusine">
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.cusine &&
													form.touched.cusine
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
														Cusine
													</FormLabel>
													<FormErrorMessage>
														{form.errors.cusine}
													</FormErrorMessage>
												</Stack>

												<Input {...field} type="text" />
											</FormControl>
										)}
									</Field>
								</Stack>
								<FieldArray
									name="badges"
									render={(arrayHelpers) => (
										<>
											<Stack
												direction={{
													base: "column",
													sm: "row",
												}}
												align={"start"}
												justify={"space-between"}
											>
												<FormLabel>Badges</FormLabel>

												<Button
													size="xs"
													colorScheme="green"
													onClick={() =>
														arrayHelpers.insert(
															props.values.badges
																.length,
															""
														)
													}
												>
													Add
												</Button>
											</Stack>
											<SimpleGrid
												spacing={2}
												columns={{
													base: 1,
													lg: 2,
												}}
											>
												{props.values.badges &&
												props.values.badges.length >
													0 ? (
													props.values.badges.map(
														(badge, index) => (
															<Field
																key={index}
																name={`badges.${index}`}
															>
																{({
																	field,
																	form,
																}) => (
																	<FormControl
																		isInvalid={
																			form
																				.errors
																				.badges?.[
																				index
																			] &&
																			form
																				.touched
																				.badges?.[
																				index
																			]
																		}
																	>
																		<InputGroup>
																			<Input
																				{...field}
																				type="text"
																			/>
																			<InputRightElement
																				zIndex={
																					0
																				}
																				width="4.5rem"
																			>
																				<IconButton
																					ml={
																						5
																					}
																					color="red.500"
																					size="sm"
																					aria-label="Delete"
																					icon={
																						<CloseIcon />
																					}
																					onClick={() =>
																						arrayHelpers.remove(
																							index
																						)
																					}
																				/>
																			</InputRightElement>
																		</InputGroup>
																	</FormControl>
																)}
															</Field>
														)
													)
												) : (
													<Button
														type="button"
														onClick={() =>
															arrayHelpers.push(
																""
															)
														}
													>
														Add a Badge
													</Button>
												)}
											</SimpleGrid>
										</>
									)}
								/>

								<Field name="description">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.description &&
												form.touched.description
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
													Description
												</FormLabel>
												<FormErrorMessage>
													{form.errors.description}
												</FormErrorMessage>
											</Stack>
											<Textarea h={"120px"} {...field} />
										</FormControl>
									)}
								</Field>
								<FieldArray
									name="features"
									render={(arrayHelpers) => (
										<>
											<Stack
												direction={{
													base: "column",
													sm: "row",
												}}
												align={"start"}
												justify={"space-between"}
											>
												<FormLabel>Features</FormLabel>

												<Button
													size="xs"
													colorScheme="green"
													onClick={() =>
														arrayHelpers.insert(
															props.values
																.features
																.length,
															""
														)
													}
												>
													Add
												</Button>
											</Stack>
											<SimpleGrid
												spacing={2}
												columns={{
													base: 1,
													lg: 2,
												}}
											>
												{props.values.features &&
												props.values.features.length >
													0 ? (
													props.values.features.map(
														(friend, index) => (
															<Field
																key={index}
																name={`features.${index}`}
															>
																{({
																	field,
																	form,
																}) => (
																	<FormControl
																		isInvalid={
																			form
																				.errors
																				.features?.[
																				index
																			] &&
																			form
																				.touched
																				.features?.[
																				index
																			]
																		}
																	>
																		<Stack
																			direction={{
																				base: "column",
																				sm: "row",
																			}}
																			align={
																				"start"
																			}
																			justify={
																				"space-between"
																			}
																		></Stack>
																		<InputGroup>
																			<Input
																				{...field}
																				type="text"
																			/>
																			<InputRightElement
																				zIndex={
																					0
																				}
																				width="4.5rem"
																			>
																				<IconButton
																					ml={
																						5
																					}
																					color="red.500"
																					size="sm"
																					aria-label="Delete"
																					icon={
																						<CloseIcon />
																					}
																					onClick={() =>
																						arrayHelpers.remove(
																							index
																						)
																					}
																				/>
																			</InputRightElement>
																		</InputGroup>
																	</FormControl>
																)}
															</Field>
														)
													)
												) : (
													<Button
														type="button"
														onClick={() =>
															arrayHelpers.push(
																""
															)
														}
													>
														Add a feature
													</Button>
												)}
											</SimpleGrid>
										</>
									)}
								/>
								<FieldArray
									name="recipe"
									render={(arrayHelpers) => (
										<>
											<Stack
												direction={{
													base: "column",
													sm: "row",
												}}
												align={"start"}
												justify={"space-between"}
											>
												<FormLabel>Recipe</FormLabel>

												<Button
													size="xs"
													colorScheme="green"
													onClick={() =>
														arrayHelpers.insert(
															props.values.recipe
																.length,
															""
														)
													}
												>
													Add
												</Button>
											</Stack>
											<SimpleGrid
												spacing={2}
												columns={{
													base: 1,
													lg: 2,
												}}
											>
												{props.values.recipe &&
												props.values.recipe.length >
													0 ? (
													props.values.recipe.map(
														(recipe, index) => (
															<Field
																key={index}
																name={`recipe.${index}`}
															>
																{({
																	field,
																	form,
																}) => (
																	<FormControl
																		isInvalid={
																			form
																				.errors
																				.recipe?.[
																				index
																			] &&
																			form
																				.touched
																				.recipe?.[
																				index
																			]
																		}
																	>
																		<Stack
																			direction={{
																				base: "column",
																				sm: "row",
																			}}
																			align={
																				"start"
																			}
																			justify={
																				"space-between"
																			}
																		></Stack>
																		<InputGroup>
																			<Input
																				{...field}
																				type="text"
																			/>
																			<InputRightElement
																				zIndex={
																					0
																				}
																				width="4.5rem"
																			>
																				<IconButton
																					ml={
																						5
																					}
																					color="red.500"
																					size="sm"
																					aria-label="Delete"
																					icon={
																						<CloseIcon />
																					}
																					onClick={() =>
																						arrayHelpers.remove(
																							index
																						)
																					}
																				/>
																			</InputRightElement>
																		</InputGroup>
																	</FormControl>
																)}
															</Field>
														)
													)
												) : (
													<Button
														type="button"
														onClick={() =>
															arrayHelpers.push(
																""
															)
														}
													>
														Add a Recipe
													</Button>
												)}
											</SimpleGrid>
										</>
									)}
								/>
							</Stack>
							<VStack>
								<Field name="isPublished">
									{({ field, form }) => (
										<Checkbox
											id="isPublished"
											isChecked={field.value}
											name="isPublished"
											onChange={(e) =>
												form.setFieldValue(
													"isPublished",
													e.target.checked
												)
											}
										>
											<Text
												fontSize={"sm"}
												textAlign={"justify"}
											>
												Upon checking this box, this
												menu item will be published and
												available to all Madre users. If
												unchecked, this item will only
												be available on Admin Menu.
											</Text>
										</Checkbox>
									)}
								</Field>

								<HStack
									width={"100%"}
									justifyContent={"center"}
								>
									<Button
										isLoading={props.isSubmitting}
										isDisabled={!props.dirty}
										type="submit"
										colorScheme={"teal"}
									>
										Submit
									</Button>
									<Button
										colorScheme={"red"}
										onClick={() =>
											router.push("/admin/menu")
										}
									>
										Discard
									</Button>
								</HStack>
							</VStack>
						</SimpleGrid>
					</Container>
				</Form>
			)}
		</Formik>
	);
};

export default AdminProductPage;
