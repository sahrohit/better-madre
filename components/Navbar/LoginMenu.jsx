import React from "react";
import { HStack, Button, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

const LoginMenu = () => {
	return (
		<HStack display={{ base: "none", lg: "inline-flex" }}>
			<Button
				display={{ base: "none", lg: "inline-flex" }}
				variant="ghost"
			>
				<ChakraLink href={"/auth/login"} as={Link} passHref>
					<a>Sign in</a>
				</ChakraLink>
			</Button>
			<Button
				colorScheme="filled"
				color={"white"}
				size="md"
				bg={"#318b6c"}
				_hover={{
					bg: "#1f5744",
				}}
			>
				<ChakraLink href={"/auth/register"} as={Link} passHref>
					<a>Get Started</a>
				</ChakraLink>
			</Button>
		</HStack>
	);
};

export default LoginMenu;
