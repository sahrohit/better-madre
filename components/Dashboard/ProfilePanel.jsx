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
	Box,
	Image,
	chakra,
	Icon,
	useClipboard,
	Link as ChakraLink,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { BsFillBriefcaseFill, BsTelephone } from "react-icons/bs";
import { MdLocationOn, MdHeadset, MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiOutlineIdcard, AiOutlineMail } from "react-icons/ai";

const ProfilePanel = () => {
	const toast = useToast();

	const router = useRouter();
	const { currentUser, logOut } = useAuth();

	const KEYVALUES = [
		{
			icon: AiOutlineIdcard,
			value: currentUser?.uid,
		},
		{
			icon: AiOutlineMail,
			value: currentUser?.email,
		},
		{
			icon: BsTelephone,
			value: "9800000000",
		},
	];

	return (
		<Flex w="full" alignItems="center" justifyContent="center">
			<Box w="sm" mx="auto" shadow="lg" rounded="lg" overflow="hidden">
				<Image
					w="full"
					h={56}
					fit="cover"
					objectPosition="center"
					src={
						currentUser?.photoURL
							? currentUser.photoURL
							: "https://source.boringavatars.com/beam/120/"
					}
					alt="avatar"
				/>

				<Flex alignItems="center" px={6} py={3} bg="gray.900">
					<Icon as={FaUser} h={6} w={6} color="white" />

					<chakra.h1
						mx={3}
						color="white"
						fontWeight="bold"
						fontSize="lg"
					>
						{currentUser?.displayName}
					</chakra.h1>
				</Flex>

				<Box py={4} px={6}>
					<chakra.p py={2}>
						Full Stack maker & UI / UX Designer , love hip hop music
						Author of Building UI.
					</chakra.p>

					{KEYVALUES.map((item) => {
						return (
							<HStack key={item.value} alignItems="center" mt={4}>
								<Icon as={item.icon} h={6} w={6} mr={2} />

								<chakra.h1 px={2} fontSize="sm">
									{item.value}
								</chakra.h1>
							</HStack>
						);
					})}
				</Box>
				<Button
					rounded={"none"}
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
			</Box>
		</Flex>
	);
};

export default ProfilePanel;
