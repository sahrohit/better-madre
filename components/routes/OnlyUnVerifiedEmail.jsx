import React from "react";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from "next/router";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useToast } from "@chakra-ui/react";

const OnlyUnVerifiedEmail = ({ children }) => {
	const toast = useToast();
	const router = useRouter();
	const { currentUser } = useAuth();

	if (!currentUser) {
		router.push("/");
		return <FullPageLoadingSpinner />;
	}

	if (currentUser.emailVerified) {
		router.push("/cart").then(() => {
			//! The last page (from which the push is being called) re-renders while router.push is being used.
			//! Unwanted Error and Warning are generated by these toast on re-render.
			// if (!toast.isActive("email-already-verified")) {
			// 	toast({
			// 		id: "email-already-verified",
			// 		title: "Your email is already verified.",
			// 		description: "You can complete your orders now.",
			// 		status: "success",
			// 		duration: 9000,
			// 		isClosable: true,
			// 	});
			// }
		});
		return <FullPageLoadingSpinner />;
	}

	return <>{children}</>;
};

export default OnlyUnVerifiedEmail;
