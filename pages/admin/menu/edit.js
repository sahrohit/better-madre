import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	Image,
	Flex,
	VStack,
	Button,
	Heading,
	SimpleGrid,
	StackDivider,
	useColorModeValue,
	VisuallyHidden,
	List,
	ListItem,
	Link as ChakraLink,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Checkbox,
	Textarea,
	InputGroup,
	InputRightElement,
	HStack,
	useToast,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { Formik, Form, Field, FieldArray } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const EditPage = () => {
	const MenuSchema = Yup.object().shape({
		menuname: Yup.string().required("Required"),
		price: Yup.number().required("Required"),
		description: Yup.string().required("Required"),
		features: Yup.array().of(Yup.string().required("Required")),
		recipe: Yup.array().of(Yup.string().required("Required")),
	});

	const { query } = useRouter();
	const { id } = query;

	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(true);

	const toast = useToast();

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
		<Formik
			initialValues={{
				menuname: item.menuname,
				price: item.price,
				description: item.description,
				features: item.features,
				recipe: item.recipe,
				images: item.images[0],
			}}
			validationSchema={MenuSchema}
			onSubmit={async (values, actions) => {
				try {
					await updateDoc(doc(db, "menu", id), {...values, images: [values.images]});
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
					<Container maxW={"7xl"}>
						<SimpleGrid
							columns={{ base: 1, lg: 2 }}
							spacing={{ base: 8, md: 10 }}
							py={{ base: 18, md: 24 }}
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
												form.errors.images &&
												form.touched.images
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
												<FormLabel>Image URL</FormLabel>
												<FormErrorMessage>
													{form.errors.images}
												</FormErrorMessage>
											</Stack>
											<Input {...field} type="text" />
										</FormControl>
									)}
								</Field>
							</VStack>

							<Stack spacing={4} w={"full"} maxW={"md"}>
								<Field name="menuname">
									{({ field, form }) => (
										<FormControl
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
												<FormLabel>Item Name</FormLabel>
												<FormErrorMessage>
													{form.errors.menuname}
												</FormErrorMessage>
											</Stack>

											<Input {...field} type="text" />
										</FormControl>
									)}
								</Field>
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
												<FormLabel>
													Price (in paisa)
												</FormLabel>
												<FormErrorMessage>
													{form.errors.price}
												</FormErrorMessage>
											</Stack>
											<Input {...field} type="number" />
										</FormControl>
									)}
								</Field>
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
											<Textarea h={"180px"} {...field} />
										</FormControl>
									)}
								</Field>
								<Field name="recipe">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.recipe &&
												form.touched.recipe
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
												<FormLabel>Recipe</FormLabel>
												<FormErrorMessage>
													{form.errors.recipe}
												</FormErrorMessage>
											</Stack>
											<Textarea h={"180px"} {...field} />
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
												{/* <FormErrorMessage>
													{form.errors.description}
												</FormErrorMessage> */}
											</Stack>

											<SimpleGrid
												spacing={2}
												columns={{ base: 1, lg: 2 }}
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
																				.features &&
																			form
																				.touched
																				.features
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
																				<Button
																					color="red.500"
																					h="1.75rem"
																					size="sm"
																					onClick={() =>
																						arrayHelpers.remove(
																							index
																						)
																					}
																				>
																					Remove
																				</Button>
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
							</Stack>
							<HStack width={"100%"} justifyContent={"center"}>
								<Button
									isLoading={props.isSubmitting}
									type="submit"
									bg="teal"
								>
									Submit
								</Button>
								<Button bg="red.500">Discard</Button>
							</HStack>
						</SimpleGrid>
					</Container>
				</Form>
			)}
		</Formik>
	);
};

export default EditPage;