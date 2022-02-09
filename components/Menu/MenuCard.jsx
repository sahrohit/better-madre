import React from "react";
import {
	Box,
	Badge,
	useColorModeValue,
	HStack,
	Text,
	IconButton,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useRouter } from "next/router";

function Rating({ rating, numberOfReviews }) {
	return (
		<HStack mt="2" alignItems="center">
			<HStack spacing={1} color={"teal.500"}>
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
								<BsStarHalf
									key={i}
									style={{ marginLeft: "1" }}
								/>
							);
						}
						return <BsStar key={i} style={{ marginLeft: "1" }} />;
					})}
			</HStack>
			<Text color="gray.600" fontSize="sm">
				{numberOfReviews} review{numberOfReviews > 1 && "s"}
			</Text>
		</HStack>
	);
}

const MenuCard = ({
	_id,
	badges,
	menuId,
	images,
	description,
	menuname,
	price,
	rating,
	numberOfReviews,
}) => {
	const router = useRouter();

	const determineBadgeColor = (badge) => {
		if (badge.toLowerCase() === "new") {
			return "green";
		} else if (badge.toLowerCase() === "popular") {
			return "purple";
		} else return "red";
	};

	return (
		<Box maxW="sm" borderWidth="1px" rounded="lg" shadow="lg">
			<Box
				cursor={"pointer"}
				bgImage={`url(${images[0]})`}
				width={"100%"}
				bgSize="cover"
				roundedTop="lg"
				bgPosition="center"
				height={"276px"}
				onClick={() => {
					router.push(`/menu/${menuId}`);
				}}
			/>

			<Box p="6">
				{badges && (
					<HStack mb={3} spacing={2}>
						{badges.map((badge) => {
							return (
								<Badge
									key={badge}
									rounded="full"
									px="2"
									colorScheme={determineBadgeColor(badge)}
									variant="solid"
								>
									{badge}
								</Badge>
							);
						})}
					</HStack>
				)}
				<Box>
					<Text fontSize="xl" lineHeight="tight" isTruncated>
						{menuname}
					</Text>
					<Text
						noOfLines={2}
						fontSize="sm"
						color={useColorModeValue("gray.600", "gray.400")}
					>
						{description}
					</Text>
				</Box>

				<Box>{`रू ${price / 100}`}</Box>

				<Rating rating={rating} numberOfReviews={numberOfReviews} />
			</Box>
		</Box>
	);
};

export default MenuCard;
