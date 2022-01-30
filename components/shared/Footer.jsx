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
	IconButton,
	useColorModeValue,
	Button,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import Logo from "@components/Logo";

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

export default function Footer() {
	return (
		<Box
			bg={useColorModeValue("#edf2f7", "black")}
			color={useColorModeValue("gray.600", "white")}
		>
			<Container as={Stack} maxW={"6xl"} py={10}>
				<SimpleGrid
					templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr" }}
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
						<Stack direction={"column"}>
							<Input
								placeholder={"Your email address"}
								bg={useColorModeValue(
									"blackAlpha.100",
									"whiteAlpha.100"
								)}
								border={0}
								_focus={{
									bg: "whiteAlpha.300",
								}}
							/>
							{/* <IconButton
								width={10}
								bg={useColorModeValue("green.400", "green.800")}
								color={useColorModeValue("white", "gray.800")}
								_hover={{
									bg: "green.600",
								}}
								aria-label="Subscribe"
								icon={}
							/> */}
							<Button
								bg={useColorModeValue("green.400", "green.800")}
								color={useColorModeValue("white", "gray.800")}
								_hover={{
									bg: "green.600",
								}}
								aria-label="Subscribe"
								size="md"
								width="120px"
								leftIcon={<BiMailSend />}
							>
								Subscribe
							</Button>
						</Stack>
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
