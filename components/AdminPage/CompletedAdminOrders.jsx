import {
	Box,
	Heading,
	Text,
	Button,
	Flex,
	Center,
	HStack,
	VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon, CheckIcon, EmailIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import AdminOrderCard from "./AdminOrderCard";
import { useAdmin } from "@contexts/AdminContext";
import { nanoid } from "nanoid";

const CompletedAdminOrders = () => {
	const router = useRouter();
	const { completedOrders } = useAdmin();

	return (
		<Box>
			{completedOrders.length > 0 ? (
				<VStack spacing={5}>
					{completedOrders.map((order) => {
							return (
								<AdminOrderCard
									key={order.orderId}
									order={order}
								/>
							);
					})}
				</VStack>
			) : (
				<Center>
					<Box textAlign="center" py={10} px={6}>
						<CheckCircleIcon boxSize={"50px"} color={"green.500"} />
						<Heading as="h2" size="xl" mt={6} mb={2}>
							No Pending Orders.
						</Heading>
						<Text key={nanoid()} color={"gray.500"}>
							Pending Orders will show up here.
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
			)}
		</Box>
	);
};

export default CompletedAdminOrders;
