import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
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
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldArray, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { CheckIcon, CloseIcon, CopyIcon } from "@chakra-ui/icons";
import OnlyAdmin from "@components/routes/OnlyAdmin";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import AdminContextWrapper from "@contexts/AdminContext";
import { useAdmin } from "@contexts/AdminContext";

const EditPage = () => {
	const MenuSchema = Yup.object().shape({
		menuname: Yup.string().required("Required"),
		badges: Yup.array().of(Yup.string().required("Required")),
		category: Yup.string().required("Required"),
		cusine: Yup.string().required("Required"),
		price: Yup.number().required("Required"),
		description: Yup.string().required("Required"),
		features: Yup.array().of(Yup.string().required("Required")),
		recipe: Yup.array().of(Yup.string().required("Required")),
		isPublished: Yup.boolean().required("Required"),
	});

	const { query } = useRouter();
	const { id } = query;

	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	const toast = useToast();
	const { hasCopied: hasMenuIdCopied, onCopy: onMenuIdCopy } = useClipboard(
		item?.menuId
	);

	useEffect(
		() =>
			onSnapshot(doc(db, "menu", id), (doc) => {
				setItem(doc.data());
				setLoading(false);
			}),
		[id]
	);

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<AdminContextWrapper>
			<OnlyLoggedIn>
				<OnlyAdmin>
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
							images: item.images[0],
							isPublished: item.isPublished,
						}}
						validationSchema={MenuSchema}
						onSubmit={async (values, actions) => {
							try {
								await updateDoc(doc(db, "menu", id), {
									...values,
									images: [values.images],
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
								<Container
									maxW={"7xl"}
									py={{ base: 12, md: 16 }}
								>
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
											<Image
												rounded={"md"}
												alt={"product image"}
												src={item.images[0]}
												fit={"cover"}
												align={"center"}
												w={"100%"}
												h={{
													base: "100%",
													sm: "400px",
													lg: "500px",
												}}
											/>
											<Field name="images">
												{({ field, form }) => (
													<FormControl
														isInvalid={
															form.errors
																.images &&
															form.touched.images
														}
													>
														<Stack
															direction={{
																base: "column",
																sm: "row",
															}}
															align={"start"}
															justify={
																"space-between"
															}
														>
															<FormLabel>
																Image URL
															</FormLabel>
															<FormErrorMessage>
																{
																	form.errors
																		.images
																}
															</FormErrorMessage>
														</Stack>
														<Input
															{...field}
															type="text"
														/>
													</FormControl>
												)}
											</Field>
										</VStack>

										<Stack
											spacing={4}
											w={"full"}
											// maxW={"md"}
										>
											{/* <Field name="menuname">
												{({ field, form }) => (
													<FormControl
														isDisabled
														isInvalid={
															form.errors
																.menuname &&
															form.touched
																.menuname
														}
													>
														<Stack
															direction={{
																base: "column",
																sm: "row",
															}}
															align={"start"}
															justify={
																"space-between"
															}
														>
															<FormLabel>
																Item Name
															</FormLabel>
															<FormErrorMessage>
																{
																	form.errors
																		.menuname
																}
															</FormErrorMessage>
														</Stack>

														<Input
															{...field}
															type="text"
														/>
													</FormControl>
												)}
											</Field> */}

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
																form.errors
																	.price &&
																form.touched
																	.price
															}
														>
															<Stack
																direction={{
																	base: "column",
																	sm: "row",
																}}
																align={"start"}
																justify={
																	"space-between"
																}
															>
																<FormLabel>
																	Price
																</FormLabel>
																<FormErrorMessage>
																	{
																		form
																			.errors
																			.price
																	}
																</FormErrorMessage>
															</Stack>
															<InputGroup>
																<Input
																	{...field}
																	type="number"
																/>
																<InputRightAddon
																	bg={
																		"grey.500"
																	}
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
																form.errors
																	.menuId &&
																form.touched
																	.menuId
															}
														>
															<Stack
																direction={{
																	base: "column",
																	sm: "row",
																}}
																align={"start"}
																justify={
																	"space-between"
																}
															>
																<FormLabel>
																	Menu Id
																</FormLabel>
																<FormErrorMessage>
																	{
																		form
																			.errors
																			.menuId
																	}
																</FormErrorMessage>
															</Stack>

															<InputGroup>
																<Input
																	isDisabled
																	{...field}
																	type="text"
																/>
																<InputRightElement width="4.5rem">
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
																form.errors
																	.category &&
																form.touched
																	.category
															}
														>
															<Stack
																direction={{
																	base: "column",
																	sm: "row",
																}}
																align={"start"}
																justify={
																	"space-between"
																}
															>
																<FormLabel>
																	Category
																</FormLabel>
																<FormErrorMessage>
																	{
																		form
																			.errors
																			.category
																	}
																</FormErrorMessage>
															</Stack>

															<Input
																{...field}
																type="text"
															/>
														</FormControl>
													)}
												</Field>

												<Field name="cusine">
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors
																	.cusine &&
																form.touched
																	.cusine
															}
														>
															<Stack
																direction={{
																	base: "column",
																	sm: "row",
																}}
																align={"start"}
																justify={
																	"space-between"
																}
															>
																<FormLabel>
																	Cusine
																</FormLabel>
																<FormErrorMessage>
																	{
																		form
																			.errors
																			.cusine
																	}
																</FormErrorMessage>
															</Stack>

															<Input
																{...field}
																type="text"
															/>
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
															justify={
																"space-between"
															}
														>
															<FormLabel>
																Badges
															</FormLabel>

															<Button
																size="xs"
																colorScheme="green"
																onClick={() =>
																	arrayHelpers.insert(
																		props
																			.values
																			.badges
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
															{props.values
																.badges &&
															props.values.badges
																.length > 0 ? (
																props.values.badges.map(
																	(
																		badge,
																		index
																	) => (
																		<Field
																			key={
																				index
																			}
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
																						<InputRightElement width="4.5rem">
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
															form.errors
																.description &&
															form.touched
																.description
														}
													>
														<Stack
															direction={{
																base: "column",
																sm: "row",
															}}
															align={"start"}
															justify={
																"space-between"
															}
														>
															<FormLabel>
																Description
															</FormLabel>
															<FormErrorMessage>
																{
																	form.errors
																		.description
																}
															</FormErrorMessage>
														</Stack>
														<Textarea
															h={"120px"}
															{...field}
														/>
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
															justify={
																"space-between"
															}
														>
															<FormLabel>
																Features
															</FormLabel>

															<Button
																size="xs"
																colorScheme="green"
																onClick={() =>
																	arrayHelpers.insert(
																		props
																			.values
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
															{props.values
																.features &&
															props.values
																.features
																.length > 0 ? (
																props.values.features.map(
																	(
																		friend,
																		index
																	) => (
																		<Field
																			key={
																				index
																			}
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
																						<InputRightElement width="4.5rem">
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
																	Add a
																	feature
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
															justify={
																"space-between"
															}
														>
															<FormLabel>
																Recipe
															</FormLabel>

															<Button
																size="xs"
																colorScheme="green"
																onClick={() =>
																	arrayHelpers.insert(
																		props
																			.values
																			.recipe
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
															{props.values
																.recipe &&
															props.values.recipe
																.length > 0 ? (
																props.values.recipe.map(
																	(
																		recipe,
																		index
																	) => (
																		<Field
																			key={
																				index
																			}
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
																						<InputRightElement width="4.5rem">
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
															textAlign={
																"justify"
															}
														>
															Upon checking this
															box, this menu item
															will be published
															and available to all
															the user accessing
															Madre. If unchecked,
															this item will only
															be available on
															Admin Menu.
														</Text>
													</Checkbox>
												)}
											</Field>

											<HStack
												width={"100%"}
												justifyContent={"center"}
											>
												<Button
													isLoading={
														props.isSubmitting
													}
													isDisabled={!props.dirty}
													type="submit"
													colorScheme={"teal"}
												>
													Submit
												</Button>
												<Button
													colorScheme={"red"}
													onClick={() =>
														router.push(
															"/admin/menu"
														)
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
				</OnlyAdmin>
			</OnlyLoggedIn>
		</AdminContextWrapper>
	);
};

export default EditPage;
