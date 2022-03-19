import {
	Button,
	Flex,
	HStack,
	Avatar,
	AvatarBadge,
	useToast,
	Text,
	Box,
	Image,
	chakra,
	Icon,
	Tooltip,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	ButtonGroup,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { BsTelephone } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiOutlineIdcard, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BiUnlink } from "react-icons/bi";

const ProfilePanel = () => {
	const toast = useToast();
	const router = useRouter();
	const {
		updateProfileDetails,
		currentUser,
		providers,
		logOut,
		linkGoogleAccount,
		unLinkGoogleAccount,
	} = useAuth();

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
		<Flex
			w="full"
			alignItems="flex-start"
			justifyContent="center"
			display={{ base: "none", lg: "flex" }}
		>
			<Box
				w="sm"
				mx="auto"
				shadow="lg"
				rounded="lg"
				alignSelf={"flex-start"}
				position="sticky"
				top={20}
			>
				<Image
					roundedTop={"lg"}
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

				{providers.includes("google.com") ? (
					<HStack my={3} justifyContent={"space-around"}>
						<HStack>
							<Avatar
								src={
									currentUser.providerData[
										providers.indexOf("google.com")
									].photoURL
								}
							>
								<AvatarBadge border={"transparent"}>
									<Icon w={6} h={6} as={FcGoogle} />
								</AvatarBadge>
							</Avatar>
							<Text>
								{
									currentUser.providerData[
										providers.indexOf("google.com")
									].displayName
								}
							</Text>
							<Tooltip label={`Linked with Google`}>
								<Icon as={CheckIcon} />
							</Tooltip>
						</HStack>

						<Popover closeOnBlur closeOnEsc>
							{({ isOpen, onClose }) => (
								<>
									<PopoverTrigger>
										<Button leftIcon={<BiUnlink />}>
											Unlink
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<PopoverContent>
											<PopoverHeader fontWeight="semibold">
												Confirmation
											</PopoverHeader>
											<PopoverArrow />
											<PopoverCloseButton />
											<PopoverBody>
												Are you sure you want to
												continue with unlinking you
												Google Account from Madre
												Account?
											</PopoverBody>
											<PopoverFooter
												d="flex"
												justifyContent="flex-end"
											>
												<ButtonGroup size="sm">
													<Button
														variant="outline"
														onClick={onClose}
													>
														Cancel
													</Button>
													<Button
														colorScheme="red"
														onClick={() => {
															unLinkGoogleAccount()
																.then(() => {
																	toast({
																		title: "Successfully Unlinked",
																		description:
																			"You Madre account is not associated with Google now.",
																		status: "success",
																		duration: 4000,
																		isClosable: true,
																	});
																	router.reload();
																})
																.catch(
																	(error) => {
																		toast({
																			title: "An Error Occured",
																			description:
																				error.message,
																			status: "error",
																			duration: 5000,
																			isClosable: true,
																		});
																	}
																);
														}}
													>
														Unlink
													</Button>
												</ButtonGroup>
											</PopoverFooter>
										</PopoverContent>
									</PopoverContent>
								</>
							)}
						</Popover>
					</HStack>
				) : (
					<Button
						leftIcon={<FcGoogle />}
						m={5}
						w="90%"
						onClick={async () => {
							await linkGoogleAccount()
								.then(() => {
									updateProfileDetails(
										currentUser,
										currentUser.displayName,
										currentUser.providerData[0].photoURL
											? currentUser.providerData[0]
													.photoURL
											: currentUser.providerData[1]
													.photoURL
									);
									toast({
										title: "Successfully Linked",
										description:
											"You Madre account is now linked with Google.",
										status: "success",
										duration: 4000,
										isClosable: true,
									});
									router.reload();
								})
								.catch((error) => {
									toast({
										title: "An Error Occured",
										description: error.message,
										status: "error",
										duration: 5000,
										isClosable: true,
									});
								});
						}}
					>
						Link with Google
					</Button>
				)}

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
