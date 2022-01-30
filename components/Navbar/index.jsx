import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Link,
	Popover,
	PopoverTrigger,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	useColorMode,
	Image,
	VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextRouter from "next/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "@components/Logo";
import { mobileBreakpointsMap } from "config/theme";

export const Navbar = () => {
	const { isOpen, onToggle } = useDisclosure();

	const { colorMode, toggleColorMode } = useColorMode();

	const isMobile = useBreakpointValue(mobileBreakpointsMap);

	return (
		<Box position="sticky" top="0" zIndex="1" marginX={!isMobile && "10"}>
			<Flex
				bg={useColorModeValue("#edf2f7", "black")}
				color={useColorModeValue("gray.600", "white")}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				zIndex="100"
				borderColor={useColorModeValue("gray.200", "gray.900")}
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
					onClick={() => NextRouter.push("/")}
				>
					{/* <Image
						width="70px"
						height="auto"
						alt="Brand Secondary Logo"
						src={useColorModeValue(
							"/Madre_light.svg",
							"/Madre_dark.svg"
						)}
						loading="eager"
					/> */}

					<Logo />

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={"flex-end"}
					direction={"row"}
					spacing={6}
				>
					<Button
						display={{ base: "none", md: "inline-flex" }}
						fontSize={"sm"}
						fontWeight={600}
						color={"white"}
						bg="#25b09c"
						_hover={{
							bg: "#e34d4d",
						}}
						onClick={() => NextRouter.push("/auth/login")}
					>
						Sign In
					</Button>

					<IconButton
						variant="nooutline"
						colorScheme="teal"
						aria-label="Toggle Light Mode"
						icon={colorMode == "light" ? <MoonIcon /> : <SunIcon />}
						onClick={toggleColorMode}
					/>
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
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");

	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<Link
								p={2}
								href={navItem.href ?? "#"}
								fontSize={"sm"}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: "none",
									color: linkHoverColor,
								}}
							>
								{navItem.label}
							</Link>
						</PopoverTrigger>
					</Popover>
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
			<Flex
				p={4}
				display={{ md: "none", base: "flex" }}
				direction="column"
				justify={"space-between"}
				align={"center"}
				height="100%"
			>
				<Button
					display={"inline-flex"}
					fontSize={"sm"}
					fontWeight={600}
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
					fontSize={"sm"}
					fontWeight={600}
					color={"white"}
					bg="#25b09c"
					_hover={{
						bg: "#e34d4d",
					}}
					onClick={() => NextRouter.push("/auth/login")}
				>
					Sign In
				</Button>
			</Flex>
		</Flex>
	);
};

const MobileNavItem = ({ label, href }) => {
	return (
		<Stack spacing={4}>
			<Flex
				py={2}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}
			>
				<Text
					as={Link}
					href={href ?? "#"}
					fontWeight={600}
					color={useColorModeValue("gray.600", "gray.200")}
				>
					{label}
				</Text>
			</Flex>
		</Stack>
	);
};

const NAV_ITEMS = [
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
	{
		label: "About Us",
		href: "/aboutus",
	},
];
