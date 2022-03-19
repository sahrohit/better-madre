import React from "react";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import OnlyEmailVerified from "@components/routes/OnlyVerifiedEmail";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import CheckoutPageSection from "@components/Checkout";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import CheckoutOption from "@components/Checkout/CheckoutOption";
import OrderContextWrapper from "@contexts/OrderContext";
import MenuContextWrapper from "@contexts/MenuContext";

const CheckoutPage = () => {
	return (
		<OrderContextWrapper>
			<OnlyLoggedIn>
				<OnlyEmailVerified>
					<MenuContextWrapper>
						<Navbar position="sticky" />
						<Heading
							textAlign={"center"}
							fontSize={"7xl"}
							py={5}
							fontWeight={"light"}
							fontFamily={"'Parisienne', sans-serif"}
						>
							Checkout
						</Heading>
						<SimpleGrid
							gap={10}
							margin={{ base: "2", md: "3", lg: "10" }}
							templateColumns={{
								base: "1fr",
								md: "2fr 1fr",
								xl: "2fr 1fr",
							}}
						>
							<CheckoutPageSection />
							<CheckoutOption />
						</SimpleGrid>
						<Footer />
					</MenuContextWrapper>
				</OnlyEmailVerified>
			</OnlyLoggedIn>
		</OrderContextWrapper>
	);
};

export default CheckoutPage;
