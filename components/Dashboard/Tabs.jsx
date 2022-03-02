import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Flex,
	useColorMode,
	Spacer,
	HStack,
	InputGroup,
	InputLeftElement,
	Input,
} from "@chakra-ui/react";
import Address from "./Address";
import CompletedOrders from "./CompletedOrders";
import PendingOrder from "./PendingOrder";
import { AiOutlineSearch } from "react-icons/ai";

const TabSection = () => {
	const { colorMode } = useColorMode();

	return (
		<Flex
			m={5}
			border="1px"
			borderRadius="12px"
			borderColor={colorMode == "light" ? `gray.200` : `whiteAlpha.300`}
		>
			<Tabs width={"100%"} isFitted variant="enclosed">
				<TabList>
					<Tab>Pending Orders</Tab>
					<Tab>Addresses</Tab>
					<Tab>Completed Orders</Tab>
				</TabList>
				<TabPanels>
					<TabPanel w={"full"}>
						<PendingOrder />
					</TabPanel>
					<TabPanel w={"full"}>
						<Address />
					</TabPanel>
					<TabPanel w={"full"}>
						<CompletedOrders />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default TabSection;
