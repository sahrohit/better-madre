import CartItem from "./CartItem";
import { useUser } from "@contexts/UserContext";
import {
	VStack,
	Center,
	Box,
	Heading,
	Text,
	Button,
	Link as ChakraLink,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "@public/lotties/emptycart.json";
import Link from "next/link";

const CartItemSection = () => {
	const { userData } = useUser();

	return (
		<VStack w={"full"} spacing={5}>
			{userData.cartItems.length !== 0 ? (
				userData.cartItems.map((item) => {
					return (
						<CartItem
							key={item.menuId}
							menuId={item.menuId}
							menuname={item.menuname}
							quantity={item.quantity}
							price={item.price}
							totalPrice={item.totalPrice}
						/>
					);
				})
			) : (
				<Center>
					<Box textAlign="center" py={10} px={6} spacing={2}>
						<Lottie
							options={{
								loop: true,
								autoplay: true,
								animationData: animationData,
								// rendererSettings: {
								// 	preserveAspectRatio: "xMidYMid slice",
								// },
							}}
							height={200}
							width={200}
						/>
						<Heading
							as="h2"
							fontWeight={"medium"}
							size="xl"
							mt={6}
							mb={2}
						>
							Cart is Empty.
						</Heading>
						<Text color={"gray.500"}>
							Items on you cart will show up here.
						</Text>

						<ChakraLink as={Link} href="/menu" passHref>
							<Button m={2}>Order Now</Button>
						</ChakraLink>
					</Box>
				</Center>
			)}
		</VStack>
	);
};

export default CartItemSection;
