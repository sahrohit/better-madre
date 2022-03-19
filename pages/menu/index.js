import React from "react";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import Menu from "@components/Menu";
import MenuContextWrapper from "@contexts/MenuContext";

const MenuPage = () => {
	return (
		<MenuContextWrapper>
			<Navbar />

			<Menu />

			<Footer />
		</MenuContextWrapper>
	);
};

export default MenuPage;
