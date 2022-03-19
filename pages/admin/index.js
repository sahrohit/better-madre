import { SimpleGrid } from "@chakra-ui/react";
import OnlyAdmin from "@components/routes/OnlyAdmin";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import { Navbar } from "@components/Navbar";
import AdminTabs from "@components/AdminPage/AdminTabs";
import ManageAdminUsers from "@components/AdminPage/ManageAdminUsers";
import AdminContextWrapper from "@contexts/AdminContext";
import MenuContextWrapper from "@contexts/MenuContext";

const AdminPage = () => {
	return (
		<OnlyLoggedIn>
			<OnlyAdmin>
				<AdminContextWrapper>
					<MenuContextWrapper>
						<Navbar position="static" />
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
					</MenuContextWrapper>
				</AdminContextWrapper>
			</OnlyAdmin>
		</OnlyLoggedIn>
	);
};

export default AdminPage;
