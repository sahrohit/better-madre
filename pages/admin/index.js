import { Button, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import OnlyAdmin from "@components/routes/OnlyAdmin";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import { Navbar } from "@components/Navbar";
import AdminTabs from "@components/AdminPage/AdminTabs";
import ManageAdminUsers from "@components/AdminPage/ManageAdminUsers";

const AdminPage = () => {
	const router = useRouter();

	return (
		<OnlyLoggedIn>
			<OnlyAdmin>
				{/* <Navbar position="static" /> */}
				<SimpleGrid
					height={"100vh"}
					templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
					columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
				>
					<AdminTabs />
					<ManageAdminUsers />
				</SimpleGrid>
				{/* <Button
					// variant={"outline"}
					onClick={() => {
						router.push("/admin/menu");
					}}
				>
					Menu
				</Button> */}
			</OnlyAdmin>
		</OnlyLoggedIn>
	);
};

export default AdminPage;
