import { memo } from "react";
import { Center, Box, Spinner } from "@chakra-ui/react";

const FullPageLoadingSpinner = () => {
	return (
		<Center minH={"100vh"}>
			<Box textAlign="center" py={10} px={6}>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="green.500"
					size="xl"
				/>
			</Box>
		</Center>
	);
};

export default memo(FullPageLoadingSpinner);
