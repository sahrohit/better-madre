import { Box, Button, Center, Heading, HStack, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { EmailIcon, CheckIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useAuth } from "@contexts/AuthContext";

import { setToStorage, getFromStorage } from "@components/helpers/localstorage";
import { useRouter } from "next/router";

const VerifyEmail = () => {
	const { currentUser, sendVerificationEmail } = useAuth();

	const router = useRouter();

	if (currentUser?.emailVerified) {
		router.push("/profile");
	}

	const [timeLeft, setTimeLeft] = useState(
		getFromStorage("resendVerificationTimeout") - Date.now() / 1000
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(
				getFromStorage("resendVerificationTimeout") - Date.now() / 1000
			);
		}, 1000);

		return () => {
			clearTimeout(timer);
			setTimeLeft(0);
		};
	});

	const formatHHMMSS = (seconds) => {
		let min =
			Math.floor(seconds / 60) >= 10
				? Math.floor(seconds / 60)
				: "0" + Math.floor(seconds / 60);
		seconds -= 60 * min;
		let sec = seconds >= 10 ? seconds : "0" + seconds;
		return min + ":" + sec;
	};

	return (
		<Center minH={"100vh"}>
			<Box textAlign="center" py={10} px={6}>
				<CheckCircleIcon boxSize={"50px"} color={"green.500"} />
				<Heading as="h2" size="xl" mt={6} mb={2}>
					Check your inbox.
				</Heading>
				<Text color={"gray.500"}>
					An email has been sent to you with the link to verify the
					email.
				</Text>

				<HStack justifyContent={"center"} spacing="24px" mt={2}>
					<Button
						leftIcon={<EmailIcon />}
						color="outline"
						isDisabled={timeLeft > 0}
						onClick={() => {
							setToStorage(
								"resendVerificationTimeout",
								Math.ceil(Date.now() / 1000) + 60
							);
							sendVerificationEmail(currentUser);
						}}
					>
						{Math.ceil(timeLeft) > 0
							? formatHHMMSS(Math.ceil(timeLeft))
							: "Resend"}
					</Button>
					<Button
						leftIcon={<CheckIcon />}
						color="outline"
						onClick={() => {
							// if (currentUser?.emailVerified) {
							router.reload();
							// }
						}}
					>
						Already Verified?
					</Button>
				</HStack>
			</Box>
		</Center>
	);
};

export default VerifyEmail;

// Thank you for signing up for a Cloudinary account

// Please verify your email address in order to access your Cloudinary account.

// We sent an email to sahrohit9586@gmail.com
// To continue, please check your inbox and verify your email address.
