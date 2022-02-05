import React, { useContext, useEffect, useState } from "react";
import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const MenuContext = React.createContext();

const useMenu = () => {
	return useContext(MenuContext);
};

const MenuProvider = ({ children }) => {
	const [menuItems, setMenuItems] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(
		() =>
			onSnapshot(collection(db, "menu"), (snapshot) => {
				setMenuItems(snapshot.docs.map((doc) => doc.data()));
				setLoading(false);
			}),
		[]
	);

	const value = {
		menuItems,
	};

	return (
		<MenuContext.Provider value={value}>
			{!loading && children}
		</MenuContext.Provider>
	);
};

export { MenuProvider };
export { useMenu };
