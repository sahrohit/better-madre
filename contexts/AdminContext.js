import React, { useContext, useEffect, useState } from "react";
import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	getDocs,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { nanoid } from "nanoid";

const AdminContext = React.createContext();

const useAdmin = () => {
	return useContext(AdminContext);
};

const AdminProvider = ({ children }) => {
	const [users, setUsers] = useState(null);
	const [uids, setUids] = useState(null);
	const [admins, setAdmins] = useState(null);
	const [adminMenu, setAdminMenu] = useState(null);
	const [loading, setLoading] = useState(true);
	const [adminCategories, setAdminCategories] = useState(new Set());
	const [adminCusines, setAdminCusines] = useState(new Set());

	console.log("Admin Context Executed");

	useEffect(() => {
		let subscribers = [];
		const menuListener = onSnapshot(collection(db, "menu"), (snapshot) => {
			setAdminMenu(snapshot.docs.map((doc) => doc.data()));
			setAdminCategories(
				new Set(snapshot.docs.map((doc) => doc.data().category))
			);
			setAdminCusines(
				new Set(snapshot.docs.map((doc) => doc.data().cusine))
			);
			setLoading(false);
		});
		subscribers.push(menuListener);
		const userListener = onSnapshot(collection(db, "users"), (snapshot) => {
			setUsers(snapshot.docs.map((doc) => doc.data()));
			setUids(snapshot.docs.map((doc) => doc.data().uid));
			setLoading(false);
		});
		subscribers.push(userListener);
		const adminListener = onSnapshot(
			collection(db, "admin"),
			(snapshot) => {
				setAdmins(snapshot.docs.map((doc) => doc.id));
				setLoading(false);
			}
		);
		subscribers.push(adminListener);
		return () => subscribers.forEach((sub) => sub());
	}, []);

	const updateMenu = async (menuId, updatedMenu) => {
		await updateDoc(doc(db, "menu", menuId), {
			...adminMenu.menuId,
			...updatedMenu,
		});
	};

	const addNewMenuItem = async (menuname, menuId) => {
		return await setDoc(doc(db, "menu", menuId), {
			_id: nanoid(),
			isPublished: false,
			price: 0,
			menuname: menuname.toUpperCase(),
			menuId: menuId,
		});
	};

	const deleteMenuItem = async (menuId) => {
		return await deleteDoc(doc(db, "menu", menuId));
	};

	const value = {
		adminMenu,
		users,
		uids,
		admins,
		adminCusines,
		adminCategories,
		updateMenu,
		addNewMenuItem,
		deleteMenuItem,
	};

	return (
		<AdminContext.Provider value={value}>
			{!loading && children}
		</AdminContext.Provider>
	);
};

export { AdminProvider };
export { useAdmin };

const AdminContextWrapper = ({ children }) => {
	return <AdminProvider>{children}</AdminProvider>;
};

export default AdminContextWrapper;
