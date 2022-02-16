import React, { useContext, useEffect, useReducer } from "react";
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
	const initialState = {
		users: null,
		uids: null,
		admins: null,
		adminMenu: null,
		loading: true,
		adminCategories: new Set(),
		adminCusines: new Set(),
	};

	const reducer = (state, action) => {
		if (action.type === "MENULISTNER") {
			return {
				...state,
				adminMenu: action.payload.adminMenu,
				adminCategories: action.payload.adminCategories,
				adminCusines: action.payload.adminCusines,
				loading: action.payload.loading,
			};
		} else if (action.type === "USERLISTENER") {
			return {
				...state,
				users: action.payload.users,
				uids: action.payload.uids,
				loading: action.payload.loading,
			};
		} else if (action.type === "ADMINLISTENER") {
			return {
				...state,
				admins: action.payload.admins,
				loading: action.payload.loading,
			};
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		let subscribers = [];
		const menuListener = onSnapshot(collection(db, "menu"), (snapshot) => {
			dispatch({
				type: "MENULISTNER",
				payload: {
					adminMenu: snapshot.docs.map((doc) => doc.data()),
					adminCategories: new Set(
						snapshot.docs.map((doc) => doc.data().category)
					),
					adminCusines: new Set(
						snapshot.docs.map((doc) => doc.data().cusine)
					),
					loading: false,
				},
			});
		});
		subscribers.push(menuListener);
		const userListener = onSnapshot(collection(db, "users"), (snapshot) => {
			dispatch({
				type: "USERLISTENER",
				payload: {
					users: snapshot.docs.map((doc) => doc.data()),
					uids: snapshot.docs.map((doc) => doc.data().uid),
					loading: false,
				},
			});
		});
		subscribers.push(userListener);
		const adminListener = onSnapshot(
			collection(db, "admin"),
			(snapshot) => {
				dispatch({
					type: "ADMINLISTENER",
					payload: {
						admins: snapshot.docs.map((doc) => doc.id),
						loading: false,
					},
				});
			}
		);
		subscribers.push(adminListener);
		return () => subscribers.forEach((sub) => sub());
	}, []);

	const updateMenu = async (menuId, updatedMenu) => {
		await updateDoc(doc(db, "menu", menuId), {
			...state.adminMenu.menuId,
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
		adminMenu: state.adminMenu,
		users: state.users,
		uids: state.uids,
		admins: state.admins,
		adminCusines: state.adminCusines,
		adminCategories: state.adminCategories,
		updateMenu,
		addNewMenuItem,
		deleteMenuItem,
	};

	return (
		<AdminContext.Provider value={value}>
			{!state.loading && children}
		</AdminContext.Provider>
	);
};

export { AdminProvider };
export { useAdmin };

const AdminContextWrapper = ({ children }) => {
	return <AdminProvider>{children}</AdminProvider>;
};

export default AdminContextWrapper;
