import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	sendPasswordResetEmail,
	updateProfile,
	sendEmailVerification,
	signInWithPopup,
	GoogleAuthProvider,
	unlink,
	linkWithPopup,
} from "firebase/auth";
import { isEqual } from "lodash";
import { getFromStorage, setToStorage } from "@components/helpers/localstorage";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = React.createContext();

const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState();
	const [providers, setProviders] = useState();
	const googleAuthProvider = new GoogleAuthProvider();

	const signUp = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const sendVerificationEmail = (user) => {
		return sendEmailVerification(user);
	};

	const signInWithGoogle = () => {
		return signInWithPopup(auth, googleAuthProvider);
	};

	const linkGoogleAccount = () => {
		return linkWithPopup(currentUser, googleAuthProvider);
	};

	const unLinkGoogleAccount = () => {
		return unlink(currentUser, "google.com");
	};

	const logOut = () => {
		return signOut(auth);
	};

	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	const updateProfileDetails = (
		user = currentUser,
		displayName = user.displayName,
		photoURL = ""
	) => {
		return updateProfile(user, { displayName, photoURL });
	};

	// const updateEmail = (email) => {
	// 	return currentUser.updateEmail(email);
	// };

	// const updatePassword = (password) => {
	// 	return currentUser.updatePassword(password);
	// };

	const unsubscribe = useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			setCurrentUser(user);
			setProviders(
				user
					? user.providerData.map((provider) => provider.providerId)
					: []
			);

			if (user) {
				if (
					!isEqual(
						{
							displayName: user.displayName,
							email: user.email,
							emailVerified: user.emailVerified,
							phoneNumber: user.phoneNumber,
							photoURL: user.photoURL,
							providerData: user.providerData,
							uid: user.uid,
						},
						JSON.parse(getFromStorage("currentUserState"))
					)
				) {
					try {
						await updateDoc(doc(db, "users", user.uid), {
							displayName: user.displayName,
							email: user.email,
							emailVerified: user.emailVerified,
							phoneNumber: user.phoneNumber,
							photoURL: user.photoURL,
							providerData: user.providerData,
							uid: user.uid,
						}).then(() => {
							setToStorage(
								"currentUserState",
								JSON.stringify({
									displayName: user.displayName,
									email: user.email,
									emailVerified: user.emailVerified,
									phoneNumber: user.phoneNumber,
									photoURL: user.photoURL,
									providerData: user.providerData,
									uid: user.uid,
								})
							);
						});
					} catch (error) {
						if (error.code === "not-found") {
							await setDoc(doc(db, "users", user.uid), {
								displayName: user.displayName,
								email: user.email,
								emailVerified: user.emailVerified,
								phoneNumber: user.phoneNumber,
								photoURL: user.photoURL,
								providerData: user.providerData,
								uid: user.uid,
								addresses: [],
								cartItems: [],
								cartTotal: 0,
							}).then(() => {
								setToStorage(
									"currentUserState",
									JSON.stringify({
										displayName: user.displayName,
										email: user.email,
										emailVerified: user.emailVerified,
										phoneNumber: user.phoneNumber,
										photoURL: user.photoURL,
										providerData: user.providerData,
										uid: user.uid,
									})
								);
							});
						}
					}
				}
			}
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		providers,
		signUp,
		logIn,
		logOut,
		resetPassword,
		updateProfileDetails,
		sendVerificationEmail,
		GoogleAuthProvider,
		signInWithGoogle,
		linkGoogleAccount,
		unLinkGoogleAccount,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };
export { useAuth };
