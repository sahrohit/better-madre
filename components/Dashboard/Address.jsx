import {
	Box,
	Heading,
	Text,
	Button,
	Flex,
	Center,
	HStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, CheckIcon, EmailIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const Address = () => {
	const router = useRouter();

	return (
		<Center>
			<Box textAlign="center" py={10} px={6}>
				<CheckCircleIcon boxSize={"50px"} color={"green.500"} />
				<Heading as="h2" size="xl" mt={6} mb={2}>
					No Addresses.
				</Heading>
				<Text color={"gray.500"}>
					You can add address by clicking on the plus icon.
				</Text>
				<HStack justifyContent={"center"} spacing="24px" mt={2}>
					<Button
						color="outline"
						onClick={() => {
							router.push("/menu");
						}}
					>
						Order Now
					</Button>
				</HStack>
			</Box>
		</Center>
	);
};

export default Address;
