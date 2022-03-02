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
	query,
	orderBy,
	serverTimestamp,
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
		orders: null,
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
			};
		} else if (action.type === "USERLISTENER") {
			return {
				...state,
				users: action.payload.users,
				uids: action.payload.uids,
			};
		} else if (action.type === "ADMINLISTENER") {
			return {
				...state,
				admins: action.payload.admins,
			};
		} else if (action.type === "ORDERLISTENER") {
			return {
				...state,
				orders: action.payload.orders,
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
					},
				});
			}
		);
		subscribers.push(adminListener);
		const orderListener = onSnapshot(
			query(collection(db, "orders"), orderBy("orderTimeStamp", "desc")),
			(snapshot) => {
				dispatch({
					type: "ORDERLISTENER",
					payload: {
						orders: snapshot.docs.map((doc) => {
							return {
								...doc.data(),
								orderId: doc.id,
							};
						}),
						loading: false,
					},
				});
			}
		);
		subscribers.push(orderListener);
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

	const updateToVerified = async (orderId) => {
		return await updateDoc(doc(db, "orders", orderId), {
			status: "verified",
			verificationTimeStamp: serverTimestamp(),
		});
	};

	const updateToLeftforDelivery = async (
		orderId,
		deliverByName,
		deliverByNumber
	) => {
		return await updateDoc(doc(db, "orders", orderId), {
			status: "left-for-delivery",
			deliveryPartner: {
				name: deliverByName,
				phoneNumber: deliverByNumber,
			},
			leftfordeliveryTimeStamp: serverTimestamp(),
		});
	};

	const updateToDelivered = async (orderId) => {
		return await updateDoc(doc(db, "orders", orderId), {
			status: "delivered",
			payment: "Paid with Cash",
			deliveredTimeStamp: serverTimestamp(),
		});
	};

	const updateToCancelled = async (orderId, cancellationMessage) => {
		return await updateDoc(doc(db, "orders", orderId), {
			status: "cancelled",
			cancellationMessage,
			cancelledTimeStamp: serverTimestamp(),
		});
	};

	const value = {
		adminMenu: state.adminMenu,
		users: state.users,
		uids: state.uids,
		admins: state.admins,
		orders: state.orders,
		pendingOrders: state.orders?.filter(
			(order) => order.status === "pending" || order.status === "verified"
		),
		leftfordeliveryOrders: state.orders?.filter(
			(order) => order.status === "left-for-delivery"
		),
		completedOrders: state.orders?.filter(
			(order) =>
				order.status === "delivered" || order.status === "cancelled"
		),
		adminCusines: state.adminCusines,
		adminCategories: state.adminCategories,
		updateMenu,
		addNewMenuItem,
		deleteMenuItem,
		updateToVerified,
		updateToLeftforDelivery,
		updateToDelivered,
		updateToCancelled,
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
