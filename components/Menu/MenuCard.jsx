import React from "react";
import {
	Box,
	Badge,
	useColorModeValue,
	HStack,
	Text,
	IconButton,
	Button,
	useToast,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "@contexts/UserContext";
import { useAuth } from "@contexts/AuthContext";
import { motion } from "framer-motion";
import { staggerChild } from "@config/animations";

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
	const MotionBox = motion(Box);
	const router = useRouter();
	const { currentUser } = useAuth();
	const { addToCart } = useUser();
	const toast = useToast();

	const determineBadgeColor = (badge) => {
		if (badge.toLowerCase() === "new") {
			return "green";
		} else if (badge.toLowerCase() === "popular") {
			return "purple";
		} else if (badge.toLowerCase() === "hot") {
			return "yellow";
		} else return "red";
	};

	return (
		<MotionBox
			variants={staggerChild}
			maxW="sm"
			borderWidth="1px"
			rounded="lg"
			shadow="lg"
		>
			<Link href={`/menu/${menuId}`} passHref>
				<Box
					cursor={"pointer"}
					bgImage={`url(${images[0].imageURL})`}
					width={"100%"}
					bgSize="cover"
					roundedTop="lg"
					bgPosition="center"
					height={"276px"}
					align={"right"}
				>
					<Button
						m={2}
						size="xs"
						bg="gray.800"
						fontSize="xs"
						fontWeight="bold"
						color="white"
						px={2}
						py={1}
						rounded="md"
						textTransform="uppercase"
						_hover={{
							bg: useColorModeValue("gray.700", "gray.600"),
						}}
						_focus={{
							bg: useColorModeValue("gray.700", "gray.600"),
							outline: "none",
						}}
						onClick={(event) => {
							event.stopPropagation();
							if (currentUser) {
								addToCart(menuId, menuname, price);
							} else {
								router.push("/auth/login");
								toast({
									title: "Not Logged in",
									description: "Please login to add to cart",
									status: "error",
									duration: 5000,
								});
							}
						}}
					>
						Add to cart
					</Button>
				</Box>
			</Link>

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
				{/* <HStack justifyContent={"flex-end"}>
					<Button
						size="xs"
						bg="gray.800"
						fontSize="xs"
						fontWeight="bold"
						color="white"
						px={2}
						py={1}
						rounded="md"
						textTransform="uppercase"
						_hover={{
							bg: useColorModeValue("gray.700", "gray.600"),
						}}
						_focus={{
							bg: useColorModeValue("gray.700", "gray.600"),
							outline: "none",
						}}
					>
						Add to cart
					</Button>
				</HStack> */}
			</Box>
		</MotionBox>
	);
};

export default MenuCard;
