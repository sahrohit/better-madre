import React, { useContext, useEffect, useState } from "react";
import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	getDocs,
	where,
	query,
} from "firebase/firestore";
import { db } from "../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";

const MenuContext = React.createContext();

const useMenu = () => {
	return useContext(MenuContext);
};

const MenuProvider = ({ children }) => {
	const [menuItems, setMenuItems] = useState(null);
	const [categories, setCategories] = useState(new Set());
	const [cusines, setCusines] = useState(new Set());
	const [loading, setLoading] = useState(true);

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, "menu"), where("isPublished", "==", true)),
				(snapshot) => {
					setMenuItems(snapshot.docs.map((doc) => doc.data()));
					setCategories(
						new Set(snapshot.docs.map((doc) => doc.data().category))
					);
					setCusines(
						new Set(snapshot.docs.map((doc) => doc.data().cusine))
					);
					setLoading(false);
				}
			),
		[]
	);

	const value = {
		menuItems,
		categories,
		cusines,
	};

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<MenuContext.Provider value={value}>
			{!loading && children}
		</MenuContext.Provider>
	);
};

export { MenuProvider };
export { useMenu };

const MenuContextWrapper = ({ children }) => {
	return <MenuProvider>{children}</MenuProvider>;
};

export default MenuContextWrapper;
