import React from "react";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import OnlyEmailVerified from "@components/routes/OnlyVerifiedEmail";
import { Navbar } from "@components/Navbar";

const CartPage = () => {
	return (
		<OnlyLoggedIn>
			<OnlyEmailVerified>
				<Navbar position="sticky" />

				<h1>This is Cart</h1>
			</OnlyEmailVerified>
		</OnlyLoggedIn>
	);
};

export default CartPage;
