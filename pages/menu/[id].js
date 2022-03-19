import React from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import MenuContextWrapper from "@contexts/MenuContext";
import ProductPage from "@components/Menu/ProductPage";

export const getStaticProps = async ({ params }) => {
	const { id } = params;
	return { props: { id } };
};

export const getStaticPaths = async () => {
	const querySnapshot = await getDocs(collection(db, "menu"));
	const paths = querySnapshot.docs.map((doc) => {
		return {
			params: { id: doc.id },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export default function Simple({ id }) {
	return (
		<MenuContextWrapper>
			<Navbar />
			<ProductPage id={id} />
			<Footer />
		</MenuContextWrapper>
	);
}
