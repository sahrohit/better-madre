import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link as ChakraLink,
	Stack,
	Image,
	Box,
	HStack,
	Text,
	FormErrorMessage,
	useBreakpointValue,
	useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { mobileBreakpointsMap } from "@config/theme";
import { Formik, Form, Field } from "formik";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { setToStorage } from "@components/helpers/localstorage";
import OnlyLoggedOut from "@components/routes/OnlyLoggedOut";

const RegisterPage = () => {
	const toast = useToast();
	const router = useRouter();
	const SignupSchema = Yup.object().shape({
		firstname: Yup.string().required(),
		lastname: Yup.string(),
		email: Yup.string()
			.email("Invalid Email Address")
			.required("Email is required"),
		password: Yup.string()
			.min(6, "Too Short!")
			.max(25, "Too Long!")
			.required("Password is required"),
	});
	const { signUp, updateProfileDetails, sendVerificationEmail } = useAuth();
	const isMobile = useBreakpointValue(mobileBreakpointsMap);

	return (
		<OnlyLoggedOut redirect="/auth/verifyemail">
			<Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
				{!isMobile && (
					<Flex flex={1}>
						<Image
							alt={"Login Image"}
							objectFit={"cover"}
							src={
								"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
							}
						/>
					</Flex>
				)}
				<Flex p={8} flex={1} align={"center"} justify={"center"}>
					<Stack spacing={4} w={"full"} maxW={"md"}>
						<Heading fontSize={"2xl"}>
							Sign up for a account
						</Heading>

						<Formik
							initialValues={{
								firstname: "",
								lastname: "",
								email: "",
								password: "",
							}}
							validationSchema={SignupSchema}
							onSubmit={(values, actions) => {
								signUp(values.email, values.password)
									.then((userCredential) => {
										const user = userCredential.user;
										updateProfileDetails(
											user,
											`${values.firstname} ${values.lastname}`
										);
										console.log(user);
										actions.setSubmitting(false);
										setToStorage(
											"resendVerificationTimeout",
											Math.ceil(Date.now() / 1000) + 60
										);
										toast({
											title: `Welcome ${values.firstname} ${values.lastname}!`,
											description:
												"We are happy to have you on board.",
											status: "success",
											duration: 9000,
											isClosable: true,
										});
										sendVerificationEmail(user).then(() => {
											// router.push(
											// 	"/auth/verifyemail",
											// 	"/auth/verifyemail"
											// );
										});
									})
									.catch((error) => {
										const errorMessage = error.message;
										toast({
											title: "Failed.",
											description: errorMessage,
											status: "error",
											duration: 9000,
											isClosable: true,
										});
										actions.setSubmitting(false);
									});
							}}
						>
							{(props) => (
								<Form>
									<Stack spacing={4} w={"full"} maxW={"md"}>
										<HStack>
											<Box>
												<Field name="firstname">
													{({ field, form }) => (
														<FormControl
															id="firstName"
															isRequired
															isInvalid={
																form.errors
																	.firstname &&
																form.touched
																	.firstname
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
																	First Name
																</FormLabel>
															</Stack>

															<Input
																{...field}
																type="text"
															/>
														</FormControl>
													)}
												</Field>
											</Box>
											<Box>
												<Field name="lastname">
													{({ field, form }) => (
														<FormControl id="lastName">
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
																	Last Name
																</FormLabel>
															</Stack>

															<Input
																{...field}
																type="text"
															/>
														</FormControl>
													)}
												</Field>
											</Box>
										</HStack>

										<Field name="email">
											{({ field, form }) => (
												<FormControl
													isRequired
													isInvalid={
														form.errors.email &&
														form.touched.email
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
															Email address
														</FormLabel>
														<FormErrorMessage>
															{form.errors.email}
														</FormErrorMessage>
													</Stack>

													<Input
														{...field}
														type="email"
													/>
												</FormControl>
											)}
										</Field>
										<Field name="password">
											{({ field, form }) => (
												<FormControl
													isRequired
													isInvalid={
														form.errors.password &&
														form.touched.password
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
															Password
														</FormLabel>
														<FormErrorMessage>
															{
																form.errors
																	.password
															}
														</FormErrorMessage>
													</Stack>
													<Input
														{...field}
														type="password"
													/>
												</FormControl>
											)}
										</Field>

										<Stack spacing={6}>
											<Button
												isLoading={props.isSubmitting}
												type="submit"
												colorScheme={"blue"}
												variant={"solid"}
											>
												Sign Up
											</Button>
										</Stack>
									</Stack>
								</Form>
							)}
						</Formik>

						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link passHref href="/auth/login">
									<ChakraLink color={"blue.400"}>
										Login
									</ChakraLink>
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Flex>
			</Stack>
		</OnlyLoggedOut>
	);
};

export default RegisterPage;
