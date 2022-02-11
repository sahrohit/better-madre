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
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";

const UserContext = React.createContext();

const useUser = () => {
	return useContext(UserContext);
};

const UserProvider = ({ children }) => {
	const [users, setUsers] = useState(null);
	const [uids, setUids] = useState(null);
	const [admins, setAdmins] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let subscribers = [];
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

	const value = {
		users,
		uids,
		admins,
	};

	return (
		<UserContext.Provider value={value}>
			{!loading && children}
		</UserContext.Provider>
	);
};

export { UserProvider };
export { useUser };
