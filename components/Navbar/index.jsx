import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Link as ChakraLink,
	Popover,
	PopoverTrigger,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	useColorMode,
	HStack,
	VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextRouter from "next/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "@components/Logo";
import { mobileBreakpointsMap } from "config/theme";
import LoginMenu from "./LoginMenu";
import { useAuth } from "@contexts/AuthContext";
import ProfileMenu from "./ProfileMenu";
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdOutlineRestaurantMenu, MdWorkOutline } from "react-icons/md";
import { BiCalendarEvent, BiBuildings } from "react-icons/bi";
import {
	motion,
	useViewportScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

export const Navbar = ({ position }) => {
	const MotionBox = motion(Box);

	const { scrollYProgress } = useViewportScroll();

	const { isOpen, onToggle } = useDisclosure();

	const { colorMode, toggleColorMode } = useColorMode();

	const isMobile = useBreakpointValue({ base: true, md: false });
	const { currentUser } = useAuth();

	const [isComplete, setIsComplete] = useState(false);

	console.log(scrollYProgress);

	return (
		<Box w={"full"} position={position} top="0" zIndex="1" boxShadow={"md"}>
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
				// borderBottom={1}
				// borderStyle={"solid"}
				// borderColor={useColorModeValue("gray.200", "gray.900")}
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
					onClick={() => NextRouter.push("/")}
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
				/>
			</Collapse>
		</Box>
	);
};

const DesktopNav = () => {
	const router = useRouter();

	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Button
						variant={
							router.asPath === navItem.href ? "solid" : "ghost"
						}
						leftIcon={navItem.icon}
						size="sm"
					>
						<ChakraLink
							href={
								router.asPath === navItem.href
									? "#"
									: navItem.href
							}
							as={Link}
							passHref
						>
							<a>{navItem.label}</a>
						</ChakraLink>
					</Button>
				</Box>
			))}
		</Stack>
	);
};

const MobileNav = ({ colorMode, toggleColorMode }) => {
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
					onClick={() => NextRouter.push("/auth/register")}
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
					onClick={() => NextRouter.push("/auth/login")}
				>
					Sign In
				</Button>
			</VStack>
		</Flex>
	);
};

const MobileNavItem = ({ label, href, icon }) => {
	const router = useRouter();

	return (
		<Stack spacing={4}>
			<Flex
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}
				onClick={() => NextRouter.push(href)}
			>
				<Link href={href} as={href} passHref>
					<Button
						variant={router.asPath === href ? "solid" : "ghost"}
						leftIcon={icon}
						size="sm"
					>
						{label}
					</Button>
				</Link>
			</Flex>
		</Stack>
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
