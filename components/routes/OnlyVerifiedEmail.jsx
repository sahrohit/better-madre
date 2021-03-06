import React, { useEffect } from "react";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from "next/router";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useToast } from "@chakra-ui/react";

const OnlyVerifiedEmail = ({ children }) => {
	const toast = useToast();
	const router = useRouter();
	const { currentUser } = useAuth();

	useEffect(() => {})

	if (!currentUser) {
		router.push("/");
		return <FullPageLoadingSpinner />;
	}

	if (!currentUser?.emailVerified) {
		router.replace("/auth/verifyemail").then(() => {
			//! The last page (from which the push is being called) re-renders while router.push is being used.
			//! Unwanted Error and Warning are generated by these toast on re-render.
			if (!toast.isActive("email-not-verified")) {
				toast({
					id: "email-not-verified",
					title: "Your email is not verified.",
					description: "Please verify your email to continue.",
					status: "warning",
					duration: 9000,
					isClosable: true,
				});
			}
		});
		return <FullPageLoadingSpinner />;
	}

	return <>{children}</>;
};

export default OnlyVerifiedEmail;
