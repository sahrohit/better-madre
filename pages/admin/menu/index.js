import React from "react";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import AdminMenu from "@components/AdminMenu/";

const AdminMenuPage = () => {
	return (
		<>
			<Navbar />
			<AdminMenu />
			<Footer />
		</>
	);
};

export default AdminMenuPage;
