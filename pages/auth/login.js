import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link as ChakraLink,
	Stack,
	Image,
	useToast,
	Text,
	useBreakpointValue,
	FormErrorMessage,
} from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { mobileBreakpointsMap } from "@config/theme";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import OnlyLoggedOut from "@components/routes/OnlyLoggedOut";

export default function LoginPage() {
	const toast = useToast();
	const router = useRouter();
	const { logIn } = useAuth();
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid Email Address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});
	const isMobile = useBreakpointValue(mobileBreakpointsMap);

	return (
		<OnlyLoggedOut>
			<Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
				<Flex p={8} flex={1} align={"center"} justify={"center"}>
					<Stack spacing={4} w={"full"} maxW={"md"}>
						<Heading fontSize={"2xl"}>
							Sign in to your account
						</Heading>
						<Formik
							initialValues={{ email: "", password: "" }}
							validationSchema={LoginSchema}
							onSubmit={(values, actions) => {
								logIn(values.email, values.password)
									.then((userCredential) => {
										const user = userCredential.user;
										toast({
											title: `Welcome back, ${user.displayName}!`,
											description:
												"We are happy to have you back.",
											status: "success",
											duration: 9000,
											isClosable: true,
										});
										actions.setSubmitting(false);
										// window.location.replace("/");
										// router.push("/", "/");
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
										<Field name="email">
											{({ field, form }) => (
												<FormControl
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
											<Stack
												direction={{
													base: "column",
													sm: "row",
												}}
												align={"start"}
												justify={"space-between"}
											>
												<Checkbox>
													Stay Logged in
												</Checkbox>
												<Link
													passHref
													href="/auth/forgotpassword"
												>
													<ChakraLink
														color={"blue.500"}
													>
														Forgot password?
													</ChakraLink>
												</Link>
											</Stack>
											<Button
												isLoading={props.isSubmitting}
												type="submit"
												colorScheme={"blue"}
												variant={"solid"}
											>
												Sign in
											</Button>
										</Stack>
									</Stack>
								</Form>
							)}
						</Formik>

						<Stack pt={6}>
							<Text align={"center"}>
								Don`t have a account?{" "}
								<Link passHref href="/auth/register">
									<ChakraLink color={"blue.400"}>
										Signup
									</ChakraLink>
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Flex>
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
			</Stack>
		</OnlyLoggedOut>
	);
}
