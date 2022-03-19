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
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useViewportScroll } from "framer-motion";

import Logo from "@components/Logo";
import LoginMenu from "./LoginMenu";
import { useAuth } from "@contexts/AuthContext";
import ProfileMenu from "./ProfileMenu";

import { MdOutlineRestaurantMenu, MdWorkOutline } from "react-icons/md";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BiCalendarEvent, BiBuildings } from "react-icons/bi";
import { useEffect, useState } from "react";
import DrawerFooterContent from "./DrawerFooterContent";
import DrawerBodyContent from "./DrawerBodyContent";
import CartIcon from "./CartIcon";

export const Navbar = ({ position }) => {
	const { scrollYProgress } = useViewportScroll();
	const { currentUser } = useAuth();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const isMobile = useBreakpointValue({ base: true, lg: false });

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
					flex={{ base: 1, lg: "auto" }}
					ml={{ base: -2 }}
					display={{ base: "flex", lg: "none" }}
				>
					<IconButton
						onClick={onOpen}
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
					justifyContent={{ base: "center", lg: "start" }}
					alignItems="center"
				>
					<Logo />

					<Flex display={{ base: "none", lg: "flex" }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, lg: 0 }}
					justify={"flex-start"}
					align={"center"}
					direction={currentUser ? "row-reverse" : "row"}
					spacing={6}
				>
					{currentUser ? <ProfileMenu /> : <LoginMenu />}

					{!isMobile && currentUser && <CartIcon />}
				</Stack>
			</Flex>

			<Drawer isOpen={isOpen} onClose={onClose} placement={"left"}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<Logo />
					</DrawerHeader>

					<DrawerBody>
						<DrawerBodyContent />
					</DrawerBody>

					<DrawerFooter>
						<DrawerFooterContent />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
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
