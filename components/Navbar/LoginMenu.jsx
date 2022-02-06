import React from "react";
import {
	HStack,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
	ButtonGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const LoginMenu = () => {
	const router = useRouter();

	return (
		<HStack>
			<Menu>
				<ButtonGroup isAttached>
					<Button
						display={{ base: "none", md: "inline-flex" }}
						fontSize={"sm"}
						fontWeight={600}
						color={"white"}
						bg="#25b09c"
						_hover={{
							bg: "#e34d4d",
						}}
						onClick={() => router.push("/auth/login")}
					>
						Sign In
					</Button>
					<MenuButton
						as={IconButton}
						fontSize="30px"
						icon={<ChevronDownIcon />}
					>
						Sign In
					</MenuButton>
				</ButtonGroup>
				<MenuList>
					<MenuItem>Download</MenuItem>
					<MenuItem>Create a Copy</MenuItem>
					<MenuItem>Mark as Draft</MenuItem>
					<MenuItem>Delete</MenuItem>
					<MenuItem>Attend a Workshop</MenuItem>
				</MenuList>
			</Menu>
		</HStack>
	);
};

export default LoginMenu;
