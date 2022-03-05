import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Link as ChakraLink,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	useColorMode,
	HStack,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useViewportScroll, useMotionValue } from "framer-motion";

import Logo from "@components/Logo";
import LoginMenu from "./LoginMenu";
import { useAuth } from "@contexts/AuthContext";
import ProfileMenu from "./ProfileMenu";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { MdOutlineRestaurantMenu, MdWorkOutline } from "react-icons/md";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BiCalendarEvent, BiBuildings } from "react-icons/bi";
import { useEffect, useState } from "react";

export const Navbar = ({ position }) => {
	const { scrollYProgress } = useViewportScroll();
	const { currentUser } = useAuth();
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const isMobile = useBreakpointValue({ base: true, md: false });

	const [navbarShadow, setNavbarShadow] = useState(false);

	useEffect(
		() =>
			scrollYProgress.onChange((latest) => {
				if (latest > 0) {
					setNavbarShadow(true);
				} else {
					setNavbarShadow(false);
				}
			}),
		[scrollYProgress]
	);

	return (
		<Box
			w={"full"}
			position={position}
			top="0"
			zIndex="1"
			boxShadow={navbarShadow && "md"}
		>
			<Flex
				mr={!isMobile && "10"}
				ml={!isMobile && "10"}
				bg={useColorModeValue("#edf2f7", "black")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				zIndex="100"
				align={"center"}
			>
				<Flex
					flex={{ base: 1, md: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", md: "none" }}
				>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? (
								<CloseIcon w={3} h={3} />
							) : (
								<HamburgerIcon w={5} h={5} />
							)
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justifyContent={{ base: "center", md: "start" }}
					alignItems="center"
				>
					<Logo />

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-start"}
					align={"center"}
					direction={currentUser ? "row-reverse" : "row"}
					spacing={6}
				>
					{currentUser ? <ProfileMenu /> : <LoginMenu />}

					{!isMobile && (
						<IconButton
							variant="nooutline"
							colorScheme="teal"
							aria-label="Toggle Light Mode"
							icon={
								colorMode == "light" ? (
									<MoonIcon />
								) : (
									<SunIcon />
								)
							}
							onClick={toggleColorMode}
						/>
					)}
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav
					colorMode={colorMode}
					toggleColorMode={toggleColorMode}
					currentUser={currentUser}
				/>
			</Collapse>
		</Box>
	);
};

const DesktopNav = () => {
	const router = useRouter();

	return (
		<Stack direction={"row"} spacing={6}>
			{NAV_ITEMS.map((navItem) => (
				<ChakraLink
					key={navItem.label}
					href={router.asPath === navItem.href ? "" : navItem.href}
					as={Link}
					passHref
				>
					<HStack
						spacing={2}
						cursor={"pointer"}
						px={2}
						py={1}
						rounded="lg"
						wrap={"nowrap"}
					>
						{navItem.icon}
						<Text whiteSpace={"nowrap"}>{navItem.label}</Text>
					</HStack>
				</ChakraLink>
			))}
		</Stack>
	);
};

const MobileNav = ({ colorMode, toggleColorMode, currentUser }) => {
	const router = useRouter();

	return (
		<Flex direction="row" justify={"space-between"} align={"center"}>
			<Stack p={4} display={{ md: "none" }}>
				{NAV_ITEMS.map((navItem) => (
					<MobileNavItem
						key={navItem.label}
						{...navItem}
						colorMode={colorMode}
						toggleColorMode={toggleColorMode}
					/>
				))}
			</Stack>
			{!currentUser && (
				<VStack
					px={4}
					display={{ md: "none", base: "flex" }}
					direction="column"
					justify={"space-between"}
					align={"center"}
					spacing={5}
				>
					<Button
						display={"inline-flex"}
						w={"full"}
						color={"white"}
						bg="#25b09c"
						_hover={{
							bg: "#e34d4d",
						}}
						onClick={() => router.push("/auth/register")}
					>
						Sign Up
					</Button>
					<Button
						display={"inline-flex"}
						w={"full"}
						color={"white"}
						bg="#25b09c"
						_hover={{
							bg: "#e34d4d",
						}}
						onClick={() => router.push("/auth/login")}
					>
						Sign In
					</Button>
				</VStack>
			)}
		</Flex>
	);
};

const MobileNavItem = ({ label, href, icon }) => {
	const router = useRouter();

	return (
		<ChakraLink
			key={label}
			href={router.asPath === href ? "" : href}
			as={Link}
			passHref
		>
			<HStack
				spacing={2}
				cursor={"pointer"}
				px={2}
				py={1}
				rounded="lg"
				wrap={"nowrap"}
			>
				{icon}
				<Text whiteSpace={"nowrap"}>{label}</Text>
			</HStack>
		</ChakraLink>
	);
};

const NAV_ITEMS = [
	{
		label: "Menu",
		href: "/menu",
		icon: <MdOutlineRestaurantMenu />,
	},
	{
		label: "Events",
		href: "/events",
		icon: <BiCalendarEvent />,
	},
	{
		label: "Jobs",
		href: "/jobs",
		icon: <MdWorkOutline />,
	},
	{
		label: "About Us",
		href: "/aboutus",
		icon: <BiBuildings />,
	},
];
