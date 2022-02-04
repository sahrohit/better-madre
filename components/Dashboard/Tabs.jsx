import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Flex,
	useColorMode,
} from "@chakra-ui/react";
import Address from "./Address";
import CompletedOrders from "./CompletedOrders";
import PendingOrder from "./PendingOrder";

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
				<TabList
				// mb="1em"
				>
					<Tab>Pending Orders</Tab>
					<Tab>Addresses</Tab>
					<Tab>Completed Orders</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<PendingOrder />
					</TabPanel>
					<TabPanel>
						<Address />
					</TabPanel>
					<TabPanel>
						<CompletedOrders />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default TabSection;
