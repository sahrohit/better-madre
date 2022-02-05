import AdminMenuCard from "./AdminMenuCard";
import { SimpleGrid, Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useMenu } from "@contexts/MenuContext";

const AdminPage = () => {
	const { menuItems } = useMenu();

	return (
		<SimpleGrid
			m={50}
			spacing={50}
			columns={{ sm: 1, md: 1, lg: 2, xl: 3 }}
		>
			{menuItems
				? menuItems.map((item) => {
						return (
							<AdminMenuCard
								key={item._id}
								id={item.menuId}
								isNew={item.isPopular}
								name={item.menuname}
								imageURL={item.images[0]}
								price={item.price}
								rating={item.rating}
								numReviews={item.numberOfReviews}
							/>
						);
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
	);
};

export default AdminPage;
