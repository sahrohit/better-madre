import React from "react";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from "next/router";
import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useToast } from "@chakra-ui/react";

const OnlyLoggedIn = ({ children }) => {
	const toast = useToast();
	const router = useRouter();
	const { currentUser } = useAuth();

	if (!currentUser) {
		router.replace("/auth/login").then(() => {
			if (!toast.isActive("not-logged-in")) {
				toast({
					id: "not-logged-in",
					title: "Not Logged in.",
					description: "You must be logged in to view this page.",
					status: "error",
					duration: 9000,
					isClosable: true,
				});
			}
		});
		return <FullPageLoadingSpinner />;
	}
	return <>{children}</>;
};

export default OnlyLoggedIn;
