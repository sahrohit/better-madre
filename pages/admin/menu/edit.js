import { useRouter } from "next/router";
import OnlyAdmin from "@components/routes/OnlyAdmin";
import OnlyLoggedIn from "@components/routes/OnlyLoggedIn";
import AdminContextWrapper from "@contexts/AdminContext";
import { Navbar } from "@components/Navbar";
import Footer from "@components/shared/Footer";
import AdminProductPage from "@components/AdminMenu/AdminProductPage";

const EditPage = () => {
	const { query } = useRouter();
	const { id } = query;

	return (
		<AdminContextWrapper>
			<OnlyLoggedIn>
				<OnlyAdmin>
					<Navbar position="sticky" />
					<AdminProductPage id={id} />
					<Footer />
				</OnlyAdmin>
			</OnlyLoggedIn>
		</AdminContextWrapper>
	);
};

export default EditPage;
