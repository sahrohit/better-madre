import React from "react";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Icon,
	AvatarBadge,
	HStack,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
	MenuDivider,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "@contexts/AuthContext";

const ProfileMenu = () => {
	
	const toast = useToast();
	const router = useRouter();

	const { currentUser, logOut } = useAuth();

	return (
		<HStack>
			<Avatar
				cursor="pointer"
				name={currentUser.displayName}
				src={
					currentUser?.photoURL
						? currentUser?.photoURL
						: "https://source.boringavatars.com/beam/120/"
				}
				onClick={() => router.push("/profile")}
			>
				{currentUser?.emailVerified && (
					<AvatarBadge
						boxSize="1em"
						bg="green.500"
						borderColor="green.500"
					>
						<Icon as={CheckIcon} w="3" h="3" />
					</AvatarBadge>
				)}
			</Avatar>
			<Menu>
				<MenuButton
					as={IconButton}
					fontSize="30px"
					icon={<ChevronDownIcon />}
				>
					Sign In
				</MenuButton>
				<MenuList>
					<MenuItem onClick={() => router.push("/profile")}>
						Dashboard
					</MenuItem>
					<MenuDivider />
					<MenuItem onClick={() => router.push("/cart")}>
						Cart
					</MenuItem>
					<MenuItem onClick={() => router.push("/cart/checkout")}>
						Checkout
					</MenuItem>
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
