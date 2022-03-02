import React, { useContext, useEffect, useReducer, useState } from "react";
import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	onSnapshot,
	getDocs,
	deleteDoc,
	where,
	query,
	orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { nanoid } from "nanoid";
import { useAuth } from "./AuthContext";

const OrderContext = React.createContext();

const useOrder = () => {
	return useContext(OrderContext);
};

const OrderProvider = ({ children }) => {
	const [orders, setOrders] = useState();
	const [loading, setLoading] = useState(true);

	const {
		currentUser: { uid },
	} = useAuth();

	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "orders"),
					where("orderedBy", "==", uid),
					orderBy("orderTimeStamp", "desc")
				),
				(snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => {
							return {
								...doc.data(),
								orderId: doc.id,
							};
						})
					);
					setLoading(false);
				}
			),
		[uid]
	);

	const value = {
		orders,
		pendingOrders: orders?.filter(
			(order) =>
				order.status === "pending" ||
				order.status === "verified" ||
				order.status === "left-for-delivery"
		),
		completedOrders: orders?.filter(
			(order) =>
				order.status === "cancelled" || order.status === "delivered"
		),
	};

	return (
		<OrderContext.Provider value={value}>
			{!loading && children}
		</OrderContext.Provider>
	);
};

export { OrderProvider };
export { useOrder };

const OrderContextWrapper = ({ children }) => {
	return <OrderProvider>{children}</OrderProvider>;
};

export default OrderContextWrapper;
