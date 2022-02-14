import React from "react";
import ProfilePanel from "@components/Dashboard/ProfilePanel";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import Tabs from "@components/Dashboard/Tabs";
import { Navbar } from "@components/Navbar";
import OnlyVerifiedEmail from "@components/routes/OnlyVerifiedEmail";

const ProfilePage = () => {
	return (
		<>
			<Navbar position="static" />
			<OnlyVerifiedEmail>
				<SimpleGrid
					height={"100vh"}
					templateColumns={{ sm: "1fr", lg: "1fr 2fr" }}
					columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
				>
					<ProfilePanel />
					<Tabs />
				</SimpleGrid>
			</OnlyVerifiedEmail>
		</>
	);
};

export default ProfilePage;
