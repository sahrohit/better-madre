import React from "react";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import AdminMenu from "@components/AdminMenu/";
import OnlyAdmin from "@components/routes/OnlyAdmin";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import AdminContextWrapper from "@contexts/AdminContext";
import MenuContextWrapper from "@contexts/MenuContext";

const AdminMenuPage = () => {
	return (
		<AdminContextWrapper>
			<OnlyLoggedIn>
				<OnlyAdmin>
					<MenuContextWrapper>
						<Navbar />
						<AdminMenu />
						<Footer />
					</MenuContextWrapper>
				</OnlyAdmin>
			</OnlyLoggedIn>
		</AdminContextWrapper>
	);
};

export default AdminMenuPage;
