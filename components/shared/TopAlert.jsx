import React from "react";
import { Alert, AlertIcon, Center, Icon, IconButton } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const TopAlert = () => {
	return (
		<Alert as={Center} status="info" py={0}>
			<AlertIcon />
			This is a dummy website and your order will not be fulfilled. The
			source code for this is available here on github.{" "}
			<Link
				passHref
				href="https://www.github.com/sahrohit/better-madre"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="View source code"
			>
				<IconButton
					variant="ghost"
					mx={2}
					icon={<Icon fontSize="20px" as={FaGithub} />}
				/>
			</Link>
		</Alert>
	);
};

export default TopAlert;
