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
} from "firebase/auth";

const AuthContext = React.createContext();

const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signUp = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const sendVerificationEmail = (user) => {
		return sendEmailVerification(user);
	};

	// const signInWithGoogle = () => {
	// 	return auth.signInWithPopup(googleProvider);
	// };

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
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signUp,
		logIn,
		logOut,
		resetPassword,
		updateProfileDetails,
		sendVerificationEmail,
		// updateEmail,
		// updatePassword,
		// signInWithGoogle,
		// signInWithFacebook,
		// signInWithGithub,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };
export { useAuth };
