import { useState } from "react";
import AdminMenuCard from "./AdminMenuCard";
import {
	SimpleGrid,
	Box,
	Skeleton,
	SkeletonText,
	Heading,
	Flex,
	useBreakpointValue,
} from "@chakra-ui/react";
import AdminMenuOption from "@components/AdminMenu/AdminMenuOption";
import SearchBar from "@components/shared/SearchBar";
import AdminMobileMenuOption from "@components/AdminMenu/AdminMobileMenuOption";
import { useAdmin } from "@contexts/AdminContext";

const AdminPage = () => {
	const { adminMenu } = useAdmin();

	const [sliderValue, setSliderValue] = useState([0, 10000]);
	const [showCategories, setShowCategories] = useState([]);
	const [showCusines, setShowCusines] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [showDelete, setShowDelete] = useState(false);

	const isMobile = useBreakpointValue({
		base: true,
		md: false,
		lg: false,
		xl: false,
	});

	const optionValidator = (item) => {
		if (
			item.price >= sliderValue[0] * 100 &&
			item.price <= sliderValue[1] * 100 &&
			(showCategories.length == 0 ||
				showCategories.includes(item.category)) &&
			(showCusines.length == 0 || showCusines.includes(item.cusine)) &&
			item.menuname.toLowerCase().includes(searchText.toLowerCase())
		) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<Heading
				textAlign={"center"}
				fontSize={"7xl"}
				py={5}
				fontWeight={"light"}
				fontFamily={"'Parisienne', sans-serif"}
			>
				Manage Menu
			</Heading>
			<Flex
				boxShadow={"md"}
				borderRadius={"lg"}
				mx={"auto"}
				w={isMobile ? "95%" : "600px"}
				my={2}
			>
				<SearchBar />
			</Flex>
			<Flex direction={{ base: "column", md: "row" }}>
				{isMobile ? (
					<AdminMobileMenuOption
						showDelete={showDelete}
						setShowDelete={setShowDelete}
						searchText={searchText}
						setSearchText={setSearchText}
						sliderValue={sliderValue}
						setSliderValue={setSliderValue}
						showCategories={showCategories}
						showCusines={showCusines}
						setShowCategories={setShowCategories}
						setShowCusines={setShowCusines}
					/>
				) : (
					<Box
						flexDirection="column"
						display={{
							base: "none",
							md: "flex",
							lg: "flex",
							xl: "flex",
						}}
					>
						<Box
							maxW="300"
							w="350px"
							margin={25}
							padding={50}
							shadow="lg"
							rounded="lg"
						>
							<AdminMenuOption
								showDelete={showDelete}
								setShowDelete={setShowDelete}
								searchText={searchText}
								setSearchText={setSearchText}
								sliderValue={sliderValue}
								setSliderValue={setSliderValue}
								showCategories={showCategories}
								showCusines={showCusines}
								setShowCategories={setShowCategories}
								setShowCusines={setShowCusines}
							/>
						</Box>
					</Box>
				)}

				<SimpleGrid
					w={"full"}
					mx={{ base: 0, md: 50 }}
					my={50}
					spacing={50}
					minChildWidth="300px"
				>
					{adminMenu
						? adminMenu.map((item) => {
								if (optionValidator(item)) {
									return (
										<AdminMenuCard
											showDelete={showDelete}
											key={item._id}
											id={item.menuId}
											isNew={item.isPopular}
											name={item.menuname}
											images={item.images}
											price={item.price}
											rating={item.rating}
											numReviews={item.numberOfReviews}
											isPublished={item.isPublished}
										/>
									);
								}
						  })
						: Array(12)
								.fill("")
								.map((_, i) => {
									return (
										<Box
											key={i}
											borderWidth="1px"
											rounded="lg"
											shadow="lg"
											bg="white"
											w="300px"
										>
											<Skeleton height="200px" />
											<SkeletonText
												padding={6}
												noOfLines={4}
												spacing="4"
											/>
										</Box>
									);
								})}
				</SimpleGrid>
			</Flex>
		</>
	);
};

export default AdminPage;
