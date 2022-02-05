import {
	Flex,
	Circle,
	Box,
	Image,
	Badge,
	useColorModeValue,
	Icon,
	chakra,
	Tooltip,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";

function Rating({ rating, numReviews }) {
	return (
		<Box d="flex" alignItems="center">
			{Array(5)
				.fill("")
				.map((_, i) => {
					const roundedRating = Math.round(rating * 2) / 2;
					if (roundedRating - i >= 1) {
						return (
							<BsStarFill
								key={i}
								style={{ marginLeft: "1" }}
								color={i < rating ? "teal.500" : "gray.300"}
							/>
						);
					}
					if (roundedRating - i === 0.5) {
						return (
							<BsStarHalf key={i} style={{ marginLeft: "1" }} />
						);
					}
					return <BsStar key={i} style={{ marginLeft: "1" }} />;
				})}
			<Box as="span" ml="2" color="gray.600" fontSize="xs">
				{numReviews} review{numReviews > 1 && "s"}
			</Box>
		</Box>
	);
}

function MenuCard({ id, isNew, imageURL, name, price, rating, numReviews }) {
	const router = useRouter();

	return (
		<Flex alignItems="center" justifyContent="center">
			<Box
				bg={useColorModeValue("white", "gray.800")}
				w="300px"
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
				position="relative"
			>
				{isNew && (
					<Circle
						size="10px"
						position="absolute"
						top={2}
						right={2}
						bg="red.200"
					/>
				)}

				<Image
					src={imageURL}
					// height="300px"
					fit={"cover"}
					alt={`Picture of ${name}`}
					roundedTop="lg"
					cursor="pointer"
					onClick={() => {
						router.push(`/menu/${id}`);
					}}
				/>

				<Box p="6">
					<Box d="flex" alignItems="baseline">
						{isNew && (
							<Badge
								rounded="full"
								px="2"
								fontSize="0.8em"
								colorScheme="red"
							>
								New
							</Badge>
						)}
					</Box>
					<Flex
						mt="1"
						justifyContent="space-between"
						alignContent="center"
					>
						<Box
							fontSize="xl"
							fontWeight="semibold"
							as="h4"
							lineHeight="tight"
							isTruncated
							cursor="pointer"
							onClick={() => {
								router.push(`/menu/${id}`);
							}}
						>
							{name}
						</Box>
						<Tooltip
							label="Add to cart"
							bg="white"
							placement={"top"}
							color={"gray.800"}
							fontSize={"0.8em"}
						>
							<chakra.a href={"#"} display={"flex"}>
								<Icon
									as={FiShoppingCart}
									h={7}
									w={7}
									alignSelf={"center"}
								/>
							</chakra.a>
						</Tooltip>
					</Flex>

					<Flex justifyContent="space-between" alignContent="center">
						<Rating rating={rating} numReviews={numReviews} />
						<Box
							fontSize="xl"
							color={useColorModeValue("gray.800", "white")}
						>
							<Box as="span" color={"gray.600"} fontSize="md">
								रू
							</Box>
							{price / 100}
						</Box>
					</Flex>
				</Box>
			</Box>
		</Flex>
	);
}

export default MenuCard;
