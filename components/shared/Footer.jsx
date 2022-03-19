import {
	Box,
	chakra,
	Container,
	Link,
	SimpleGrid,
	Stack,
	Text,
	VisuallyHidden,
	Input,
	useColorModeValue,
	Button,
	FormControl,
	useToast,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import Logo from "@components/Logo";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SubscriptionSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
});

const SocialButton = ({ children, label, href }) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};

const ListHeader = ({ children }) => {
	return (
		<Text fontWeight={"500"} fontSize={"lg"} mb={2}>
			{children}
		</Text>
	);
};

useToast;

export default function Footer() {
	const toast = useToast();
	return (
		<Box
			bg={useColorModeValue("#edf2f7", "black")}
			color={useColorModeValue("gray.600", "white")}
		>
			<Container as={Stack} maxW={"6xl"} py={10}>
				<SimpleGrid
					templateColumns={{ sm: "1fr 1fr", md: "5fr 3fr 3fr" }}
					spacing={8}
				>
					<Stack spacing={6}>
						<Logo />

						<Text fontSize={"sm"}>
							&#169; 2022 Madre. All rights reserved
						</Text>
						<Stack direction={"row"} spacing={6}>
							{SOCIAL_MEDIA.map((social) => {
								return (
									<SocialButton
										key={social.label}
										label={social.label}
										href={social.href}
									>
										{social.icon}
									</SocialButton>
								);
							})}
						</Stack>
					</Stack>

					<Stack align={"flex-start"}>
						<ListHeader>Company</ListHeader>
						{QUICK_LINKS.map((link) => {
							return (
								<Link key={link.label} href={link.href}>
									{link.label}
								</Link>
							);
						})}
					</Stack>

					<Stack align={"flex-start"} justifyContent="flex-start">
						<ListHeader>Stay up to date</ListHeader>
						<Formik
							initialValues={{ email: "" }}
							validationSchema={SubscriptionSchema}
							validateOnChange={false}
							validateOnBlur={false}
							onSubmit={async (values, actions) => {
								const res = await fetch("/api/subscribe", {
									body: JSON.stringify({
										email: values.email,
									}),
									headers: {
										"Content-Type": "application/json",
									},
									method: "POST",
								});
								const { error } = await res.json();
								if (error) {
									if (
										error?.text?.includes("Member Exists")
									) {
										toast({
											title: "Already Subscribed",
											description:
												"You are already subscribed",
											status: "success",
											duration: 3000,
											isClosable: true,
										});
									} else {
										toast({
											title: "Error",
											description: "An Error Occured",
											status: "error",
											duration: 3000,
											isClosable: true,
										});
									}
								} else {
									toast({
										title: "Subscribed !",
										description:
											"Good contents comming your way !",
										status: "success",
										duration: 3000,
										isClosable: true,
									});
								}
								actions.setSubmitting(false);
							}}
						>
							{(props) => (
								<Form>
									<Stack direction={"column"} spacing={2}>
										<Field name="email">
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.touched.email &&
														form.errors.email
													}
												>
													<Input
														{...field}
														placeholder={
															"Your email address"
														}
														autoComplete="email"
														type="email"
													/>
												</FormControl>
											)}
										</Field>
										<Button
											isLoading={props.isSubmitting}
											type="submit"
											colorScheme={"green"}
											aria-label="Subscribe"
											size="md"
											width="120px"
											leftIcon={<BiMailSend />}
										>
											Subscribe
										</Button>
									</Stack>
								</Form>
							)}
						</Formik>
					</Stack>
				</SimpleGrid>
			</Container>
		</Box>
	);
}

const SOCIAL_MEDIA = [
	{
		icon: <FaTwitter />,
		label: "Twitter",
		href: "#",
	},
	{
		icon: <FaInstagram />,
		label: "Instagram",
		href: "#",
	},
	{
		icon: <FaYoutube />,
		label: "Youtube",
		href: "#",
	},
];

const QUICK_LINKS = [
	{
		label: "About us",
		href: "/aboutus",
	},
	{
		label: "Menu",
		href: "/menu",
	},
	{
		label: "Events",
		href: "/events",
	},
	{
		label: "Jobs",
		href: "/jobs",
	},
];
