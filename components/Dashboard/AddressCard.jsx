import {
	Button,
	Box,
	HStack,
	VStack,
	Heading,
	Text,
	toast,
	useToast,
} from "@chakra-ui/react";
import React from "react";
import { useUser } from "@contexts/UserContext";

const AddressCard = ({ address }) => {
	const { deleteAddress } = useUser();

	const toast = useToast();

	return (
		<Box boxShadow={"md"} w={"full"} p={4} px={8} rounded={"md"}>
			<HStack justifyContent={"space-between"}>
				<VStack align={"left"}>
					<Heading fontWeight={"normal"} size="lg">
						{address.addressName}
					</Heading>
					<Text>{address.landmark}</Text>
					<Text>{address.addressline1}</Text>
					<Text>{address.addressline2}</Text>
					<Text>{`${address.city}, ${address.state}, ${address.zipcode}`}</Text>
				</VStack>

				<VStack>
					<Button
						w={"full"}
						colorScheme={"blue"}
						variant={"outline"}
						onClick={() =>
							toast({
								title: "Not yet available",
								description:
									"This feature will be available in the next update.",
								status: "info",
								duration: 4000,
								isClosable: true,
							})
						}
					>
						Edit
					</Button>
					<Button
						w={"full"}
						colorScheme={"red"}
						variant={"outline"}
						onClick={() => deleteAddress(address.addressId)}
					>
						Delete
					</Button>
				</VStack>
			</HStack>
		</Box>
	);
};

export default AddressCard;
