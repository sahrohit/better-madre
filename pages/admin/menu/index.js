import React from "react";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import AdminMenu from "@components/AdminMenu/";
import OnlyAdmin from "@components/routes/OnlyAdmin";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import AdminContextWrapper from "@contexts/AdminContext";

const AdminMenuPage = () => {
	return (
		<AdminContextWrapper>
			<OnlyLoggedIn>
				<OnlyAdmin>
					<Navbar />
					<AdminMenu />
					<Footer />
				</OnlyAdmin>
			</OnlyLoggedIn>
		</AdminContextWrapper>
	);
};

export default AdminMenuPage;
