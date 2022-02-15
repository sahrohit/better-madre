import React from "react";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import OnlyEmailVerified from "@components/routes/OnlyVerifiedEmail";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";

const CheckoutPage = () => {
	return (
		<OnlyLoggedIn>
			<OnlyEmailVerified>
				<Navbar position="sticky" />
				<h1>This is Checkout Page</h1>
				<Footer />
			</OnlyEmailVerified>
		</OnlyLoggedIn>
	);
};

export default CheckoutPage;
