import React from "react";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import OnlyEmailVerified from "@components/routes/OnlyVerifiedEmail";
import { Navbar } from "@components/Navbar";

const CheckoutPage = () => {
	return (
		<OnlyLoggedIn>
			<OnlyEmailVerified>
				<Navbar position="sticky" />
				<h1>This is Checkout Page</h1>
			</OnlyEmailVerified>
		</OnlyLoggedIn>
	);
};

export default CheckoutPage;
