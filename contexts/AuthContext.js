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
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";

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

	// const signInWithFacebook = () => {
	// 	return auth.signInWithPopup(facebookProvider);
	// };

	// const signInWithGithub = () => {
	// 	return auth.signInWithPopup(githubProvider);
	// };

	const logOut = () => {
		return signOut(auth);
	};

	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email);
	};

	const updateProfileDetails = (user, displayName, photoURL = "") => {
		return updateProfile(user, { displayName, photoURL });
	};

	// const updateEmail = (email) => {
	// 	return currentUser.updateEmail(email);
	// };

	// const updatePassword = (password) => {
	// 	return currentUser.updatePassword(password);
	// };

	const unsubscribe = useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setProviders(
				user.providerData.map((provider) => provider.providerId)
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
					updateDoc(doc(db, "users", user.uid), {
						displayName: user.displayName,
						email: user.email,
						emailVerified: user.emailVerified,
						phoneNumber: user.phoneNumber,
						photoURL: user.photoURL,
						providerData: user.providerData,
						uid: user.uid,
					});
					console.log("Updated in Database");
				} else {
					console.log("Used Cached Data");
				}
			}

			console.log("user", user);

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
		signInWithGoogle,
		unLinkGoogleAccount,
		linkGoogleAccount,
		// updateEmail,
		// updatePassword,
		// signInWithFacebook,
		// signInWithGithub,
	};

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };
export { useAuth };
