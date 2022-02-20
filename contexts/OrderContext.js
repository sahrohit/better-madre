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
				query(collection(db, "orders"), where("orderedBy", "==", uid)),
				(snapshot) => {
					setOrders(snapshot.docs.map((doc) => doc.data()));
					setLoading(false);
				}
			),
		[uid]
	);

	const value = {
		orders,
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
