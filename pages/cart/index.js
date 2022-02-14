import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import OnlyEmailVerified from "@components/routes/OnlyVerifiedEmail";
import { Navbar } from "@components/Navbar";
import Cart from "@components/Cart";
import { SimpleGrid, Heading } from "@chakra-ui/react";
import CartOption from "@components/Cart/CartOption";

const CartPage = () => {
	return (
		<OnlyLoggedIn>
			<OnlyEmailVerified>
				<Navbar position="sticky" />
				<Heading
					textAlign={"center"}
					fontSize={"7xl"}
					py={5}
					fontWeight={"light"}
					fontFamily={"'Parisienne', sans-serif"}
				>
					Cart
				</Heading>
				<SimpleGrid
					gap={10}
					margin={{ base: "2", md: "3", lg: "10" }}
					templateColumns={{
						base: "1fr",
						md: "2fr 1fr",
						xl: "3fr 1fr",
					}}
				>
					<Cart />
					<CartOption />
				</SimpleGrid>
			</OnlyEmailVerified>
		</OnlyLoggedIn>
	);
};

export default CartPage;
