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
	Image as ChakraImage,
	useToast,
	Text,
	useBreakpointValue,
	FormErrorMessage,
	Divider,
	Center,
	VStack,
	HStack,
	IconButton,
	Icon,
} from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { mobileBreakpointsMap } from "@config/theme";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import OnlyLoggedOut from "@components/routes/OnlyLoggedOut";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInRight } from "@config/animations";

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid Email Address")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
	const toast = useToast();
	const router = useRouter();
	const { logIn, signInWithGoogle } = useAuth();
	const isMobile = useBreakpointValue(mobileBreakpointsMap);
	const MotionFlex = motion(Flex);

	return (
		<OnlyLoggedOut>
			<Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
				<MotionFlex
					p={8}
					flex={1}
					align={"center"}
					justify={"center"}
					initial="initial"
					animate="animate"
					variants={fadeInRight}
				>
					<Stack spacing={4} w={"full"} maxW={"md"}>
						<Text align={"left"} my={10}>
							Return to{" "}
							<Link passHref href="/">
								<ChakraLink iHomecolor={"blue.400"}>
									Home,
								</ChakraLink>
							</Link>
						</Text>
						<Heading
							fontSize={"3xl"}
							fontWeight={"medium"}
							textAlign={"center"}
							fontFamily={"Inter"}
							whiteSpace={"nowrap"}
							m={5}
						>
							Welcome back to Madre,
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
													<HStack
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
													</HStack>

													<Input
														{...field}
														autoComplete="email"
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
													<HStack
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
													</HStack>
													<Input
														{...field}
														autoComplete="current-password"
														type="password"
													/>
												</FormControl>
											)}
										</Field>

										<Stack spacing={6}>
											<HStack
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
											</HStack>
											<Button
												isLoading={props.isSubmitting}
												type="submit"
												colorScheme={"green"}
												variant={"solid"}
											>
												Sign in
											</Button>
										</Stack>
									</Stack>
								</Form>
							)}
						</Formik>

						<Center>
							<Divider w={"50%"} />
						</Center>

						<Button
							leftIcon={<FcGoogle fontSize={"25px"} />}
							type="submit"
							variant={"outline"}
							onClick={() => {
								signInWithGoogle()
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
									});
							}}
						>
							Continue with Google
						</Button>

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
				</MotionFlex>
				{!isMobile && (
					<Flex flex={2} position={"relative"}>
						<Flex
							color={"white"}
							zIndex={1}
							direction={"column"}
							w={"full"}
							alignItems={"flex-end"}
							justifyContent={"flex-end"}
						>
							<Heading
								p={"20%"}
								fontFamily={"Dancing Script"}
								fontWeight={"semibold"}
								fontSize={"80px"}
								whiteSpace={"nowrap"}
							>
								Welcome back,
							</Heading>
						</Flex>

						<ChakraImage
							as={Image}
							alt={"Beautiful Foods"}
							layout={"fill"}
							objectFit={"cover"}
							filter={`blur(1px) brightness(80%)`}
							src={
								"https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
							}
						/>
					</Flex>
				)}
			</Stack>
		</OnlyLoggedOut>
	);
}
