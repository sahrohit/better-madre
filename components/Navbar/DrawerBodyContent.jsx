import React from "react";
import { NAV_ITEMS } from "@config/navbar";
import {
	VStack,
	Text,
	Link as ChakraLink,
	HStack,
	Box,
	Button,
	SimpleGrid,
	useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineIdcard, AiOutlineMail } from "react-icons/ai";
import { useAuth } from "@contexts/AuthContext";
import Lottie from "react-lottie";
import animationData from "@public/lotties/fryingpan.json";

const DrawerBodyContent = () => {
	const router = useRouter();
	const { currentUser } = useAuth();

	const hoverColor = useColorModeValue("gray.100", "gray.700");

	const KEYVALUES = [
		{
			icon: AiOutlineIdcard,
			value: currentUser?.uid,
		},
		{
			icon: AiOutlineMail,
			value: currentUser?.email,
		},
		{
			icon: BsTelephone,
			value: "9800000000",
		},
	];

	return (
		<VStack justifyContent={"space-between"} w={"full"} h={"full"}>
			{/* <SimpleGrid columns={2} spacing={2}> */}
			<VStack w={"full"}>
				{NAV_ITEMS.map((navItem) => (
					<Box key={navItem.label} w={"full"}>
						<ChakraLink
							key={navItem.label}
							href={
								router.asPath === navItem.href
									? ""
									: navItem.href
							}
							as={Link}
							passHref
						>
							<HStack
								_hover={{
									bg: hoverColor,
								}}
								bg={
									router.pathname === navItem.href &&
									hoverColor
								}
								// border={"1px solid"}
								borderColor="gray.400"
								spacing={2}
								cursor={"pointer"}
								px={3}
								py={2}
								rounded="md"
								wrap={"nowrap"}
								w={"full"}
								justifyContent={"space-between"}
							>
								<Text fontSize={"lg"} whiteSpace={"nowrap"}>
									{navItem.label}
								</Text>
								{navItem.icon}
							</HStack>
						</ChakraLink>
					</Box>
				))}
			</VStack>
			{/* </SimpleGrid> */}
			{!currentUser && (
				<VStack
					w={"full"}
					bg={"gray.100"}
					p={2}
					rounded="lg"
					align={"center"}
				>
					<Lottie
						options={{
							loop: true,
							autoplay: true,
							animationData: animationData,
						}}
						height={150}
						width={250}
					/>
					<Text fontSize={"lg"} textAlign="center">
						Order foods easily in minutes.
					</Text>
					<Button
						w={"80%"}
						colorScheme="green"
						onClick={() => router.push("/auth/register")}
					>
						Get Started
					</Button>
				</VStack>
			)}
		</VStack>
	);
};

export default DrawerBodyContent;
