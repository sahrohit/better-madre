import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	HStack,
	Avatar,
	AvatarBadge,
	IconButton,
	Center,
	useToast,
	Text,
	Badge,
	Stat,
	StatLabel,
	StatHelpText,
	StatNumber,
	Link as ChakraLink,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";

const ProfilePanel = () => {
	console.log("Re-rendering the Profile Panel");

	const toast = useToast();

	const router = useRouter();
	const { currentUser, logOut } = useAuth();

	const KEYVALUES = [
		{
			key: "Uid: ",
			value: currentUser?.uid,
		},
		{
			key: "Phone Number: ",
			value: 9818506752,
		},
	];

	return (
		<Flex m={5} align={"center"} justify={"center"}>
			<Stack
				spacing={4}
				w={"full"}
				maxW={"md"}
				rounded={"xl"}
				boxShadow={"lg"}
				p={6}
				my={12}
				// bg={useColorModeValue("gray.50", "gray.800")}
			>
				<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
					Profile
				</Heading>
				<Stack
					direction={["column"]}
					justifyContent={"center"}
					alignItems={"center"}
					spacing={6}
				>
					<Avatar
						size="xl"
						src={
							currentUser?.photoURL
								? currentUser.photoURL
								: "https://source.boringavatars.com/beam/120/"
						}
					>
						{currentUser?.emailVerified && (
							<AvatarBadge
								as={IconButton}
								size="sm"
								rounded="full"
								colorScheme="green"
								aria-label="remove Image"
								icon={<CheckIcon />}
							/>
						)}
					</Avatar>
				</Stack>
				<Stack justifyContent={"center"} alignItems={"center"}>
					<Heading fontSize={"2xl"} fontFamily={"body"}>
						{currentUser.displayName}
					</Heading>
					<Text fontWeight={600} color={"gray.500"}>
						{currentUser.email}
					</Text>
					<Text
						textAlign={"center"}
						color={useColorModeValue("gray.700", "gray.400")}
						px={3}
					>
						Actress, musician, songwriter and artist. PM for work
						inquires or{" "}
						<ChakraLink href={"#"} color={"blue.400"}>
							#tag
						</ChakraLink>{" "}
						me in your posts
					</Text>
				</Stack>
				<Stack
					align={"left"}
					justify={"center"}
					direction={"column"}
					width={"100%"}
				>
					{KEYVALUES.map((item) => {
						return (
							<HStack key={item.key}>
								<Text fontWeight={600} color={"gray.500"}>
									{item.key}
								</Text>
								<Text>{item.value}</Text>
							</HStack>
						);
					})}
				</Stack>
				<Stack
					align={"center"}
					justify={"center"}
					direction={"row"}
					p={2}
					spacing={8}
					border="1px"
					borderRadius="12px"
					width={"100%"}
				>
					<Stat>
						<StatLabel>Total Orders</StatLabel>
						<StatNumber>0</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Total Spent</StatLabel>
						<StatNumber>रू0.00</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Total Cusine</StatLabel>
						<StatNumber>0</StatNumber>
					</Stat>
				</Stack>

				<Stack spacing={6} direction={["column", "row"]}>
					<Button
						bg={"red.400"}
						color={"white"}
						w="full"
						_hover={{
							bg: "red.500",
						}}
						onClick={() => {
							logOut()
								.then(() => {
									toast({
										title: "",
										description: "Logged Out Successfully.",
										status: "success",
										duration: 9000,
										isClosable: true,
									});
									router.replace("/auth/login");
								})
								.catch((error) => {
									toast({
										title: "An Error Occured",
										description: error.message,
										status: "error",
										duration: 9000,
										isClosable: true,
									});
								});
						}}
					>
						Logout
					</Button>
				</Stack>
			</Stack>
		</Flex>
	);
};

export default ProfilePanel;
