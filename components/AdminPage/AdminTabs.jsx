import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Flex,
	useColorMode,
} from "@chakra-ui/react";
import LeftForDelivery from "./LeftForDelivery";
import CompletedAdminOrders from "./CompletedAdminOrders";
import OrderRecieved from "./OrderRecieved";

const AdminTabs = () => {
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
					<Tab>Orders Recieved</Tab>
					<Tab>Left for Delivery</Tab>
					<Tab>Completed Orders</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<OrderRecieved />
					</TabPanel>
					<TabPanel>
						<LeftForDelivery />
					</TabPanel>
					<TabPanel>
						<CompletedAdminOrders />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default AdminTabs;
