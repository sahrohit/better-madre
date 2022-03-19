import React from "react";
import {
	Avatar,
	HStack,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useToast,
	MenuGroup,
	Text,
	Switch,
	useBreakpointValue,
	useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "@contexts/AuthContext";

const ProfileMenu = () => {
	const toast = useToast();
	const router = useRouter();
	const { currentUser, logOut } = useAuth();
	const { colorMode, toggleColorMode } = useColorMode();
	// const isMobile = useBreakpointValue({ base: true, lg: false });

	return (
		<HStack>
			<Menu>
				<MenuButton
					size="md"
					cursor="pointer"
					name={currentUser.displayName}
					src={
						currentUser?.photoURL
							? currentUser?.photoURL
							: "https://source.boringavatars.com/beam/120/"
					}
					as={Avatar}
				/>
				<MenuList>
					<MenuGroup title="Profile">
						<MenuItem onClick={() => router.push("/profile")}>
							Dashboard
						</MenuItem>
						<MenuItem onClick={() => router.push("/cart")}>
							Cart
						</MenuItem>
						<MenuItem onClick={() => router.push("/cart/checkout")}>
							Checkout
						</MenuItem>
					</MenuGroup>

					<MenuDivider />
					<MenuGroup title="Theme">
						<MenuItem closeOnSelect={false}>
							<HStack
								w={"full"}
								justifyContent={"space-between"}
								align={"center"}
							>
								<Text>Dark Mode</Text>
								<Switch
									pt={1}
									isChecked={colorMode === "dark"}
									onChange={() => {
										toggleColorMode();
									}}
									size="lg"
									colorScheme="grey"
								/>
							</HStack>
						</MenuItem>
					</MenuGroup>
					<MenuDivider />
					<MenuGroup title="Management">
						<MenuItem
							onClick={() => {
								router.push("/admin");
							}}
						>
							Admin
						</MenuItem>
						<MenuItem
							onClick={() => {
								router.push("/admin/menu");
							}}
						>
							Manage Menu
						</MenuItem>
					</MenuGroup>
					<MenuDivider />
					<MenuItem
						onClick={() => {
							logOut()
								.then(() => {
									toast({
										title: "",
										description: "Logged Out Successfully.",
										status: "success",
										duration: 9000,
										isClosable: true,
									});
									router.push("/auth/login");
								})
								.catch((error) => {
									toast({
										title: "An Error Occured",
										description: error.message,
										status: "error",
										duration: 9000,
										isClosable: true,
									});
								});
						}}
						color="red.500"
					>
						Logout
					</MenuItem>
				</MenuList>
			</Menu>
		</HStack>
	);
};

export default ProfileMenu;
