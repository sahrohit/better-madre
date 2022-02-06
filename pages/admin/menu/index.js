import React from "react";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import AdminMenu from "@components/AdminMenu/";
import OnlyAdmin from "@components/routes/OnlyAdmin";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";

const AdminMenuPage = () => {
	return (
		<OnlyLoggedIn>
			<OnlyAdmin>
				<Navbar />
				<AdminMenu />
				<Footer />
			</OnlyAdmin>
		</OnlyLoggedIn>
	);
};

export default AdminMenuPage;
