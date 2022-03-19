import React from "react";
import {
	Flex,
	Box,
	useColorModeValue,
	chakra,
	HStack,
	Center,
	Switch,
	Text,
	IconButton,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAdmin } from "@contexts/AdminContext";
import { DeleteIcon } from "@chakra-ui/icons";

const AdminMenuCard = ({
	id,
	isNew,
	images,
	name,
	price,
	rating,
	numReviews,
	isPublished,
	showDelete,
}) => {
	const toast = useToast();
	const router = useRouter();
	const { updateMenu, deleteMenuItem } = useAdmin();

	return (
		<Flex w="full" alignItems="center" justifyContent="center">
			<Flex
				direction="column"
				justifyContent="center"
				alignItems="center"
				w="sm"
				mx="auto"
			>
				<Center
					bg="gray.300"
					h={64}
					w="full"
					rounded="lg"
					shadow="md"
					bgSize="cover"
					bgPos="center"
					style={{
						backgroundImage: `url(${images?.[0].imageURL})`,
					}}
					cursor="pointer"
					onClick={() => {
						router.push({
							pathname: `/admin/menu/edit`,
							query: { id },
						});
					}}
					position="relative"
				>
					{showDelete && (
						<IconButton
							z={2}
							position="absolute"
							fontSize="25px"
							colorScheme="red"
							top={2}
							right={2}
							icon={<DeleteIcon />}
							onClick={(e) => {
								e.stopPropagation();
								deleteMenuItem(id).then(() => {
									toast({
										title: "Deleted",
										description: `${name} deleted.`,
										status: "success",
										duration: 5000,
										isClosable: true,
									});
								});
							}}
						/>
					)}

					<Box
						w={64}
						bg={useColorModeValue("white", "gray.800")}
						roundedTop="lg"
						overflow="hidden"
						position="absolute"
						bottom={0}
						mx={"auto"}
					>
						<chakra.h3
							py={2}
							textAlign="center"
							fontWeight="bold"
							textTransform="uppercase"
							color={useColorModeValue("gray.800", "white")}
							letterSpacing={1}
						>
							{name}
						</chakra.h3>
					</Box>
				</Center>

				<Box
					w={64}
					bg={useColorModeValue("white", "gray.800")}
					shadow="lg"
					roundedBottom="lg"
					overflow="hidden"
				>
					<HStack
						alignItems="center"
						justifyContent="space-between"
						py={2}
						px={3}
						bg={useColorModeValue("gray.200", "gray.700")}
					>
						<Text
							fontWeight="bold"
							color={useColorModeValue("gray.800", "gray.200")}
						>
							रू {price / 100}
						</Text>
						<HStack justifyContent={"center"}>
							<Text>Is Published</Text>
							<Switch
								isChecked={isPublished}
								onChange={(e) =>
									updateMenu(id, {
										isPublished: e.target.checked,
									})
								}
								id="email-alerts"
							/>
						</HStack>
					</HStack>
				</Box>
			</Flex>
		</Flex>
	);
};

export default AdminMenuCard;
