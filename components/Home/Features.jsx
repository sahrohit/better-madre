import { ReactElement } from "react";
import {
	Box,
	SimpleGrid,
	Icon,
	Text,
	Stack,
	Flex,
	Container,
	Heading,
	chakra,
} from "@chakra-ui/react";
import { FcKindle, FcPodiumWithAudience, FcInTransit } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
	return (
		<Stack
		//  textAlign={"center"}
		>
			<Flex
				w={16}
				h={16}
				align={"center"}
				justify={"center"}
				color={"white"}
				rounded={"full"}
				bg={"gray.100"}
				mb={1}
			>
				{icon}
			</Flex>
			<Text fontWeight={600}>{title}</Text>
			<Text color={"gray.600"}>{text}</Text>
		</Stack>
	);
};

export default function SimpleThreeColumns() {
	return (
		<Flex
			p={4}
			direction="column"
			alignItems="center"
			justifyContent="center"
			id="featureList"
			minHeight="95vh"
			pt={{ base: "10vh" }}
		>
			<Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
				<chakra.h1
					textAlign={"center"}
					fontSize={"4xl"}
					py={10}
					fontWeight={"bold"}
				>
					Features
				</chakra.h1>
				<Text color={"gray.500"} fontSize={"xl"}>
					The services we offer are just to satisfy your needs.
				</Text>
			</Stack>
			<Container maxW={"6xl"} mt={10}>
				<SimpleGrid columns={{ base: 1, md: 3 }} spacing={20}>
					{FEATURES_LIST.map((feature) => {
						return (
							<Feature
								key={feature.title}
								icon={<Icon as={feature.icon} w={10} h={10} />}
								title={feature.title}
								text={feature.text}
							/>
						);
					})}
				</SimpleGrid>
			</Container>
		</Flex>
	);
}

const FEATURES_LIST = [
	{
		icon: FcKindle,
		title: "Reservation",
		text: "You can reserve you favourite place comfortably.",
	},
	{
		icon: FcPodiumWithAudience,
		title: "Events",
		text: "You can help us host your beautiful moments with us.",
	},
	{
		icon: FcInTransit,
		title: "Instant Delivery",
		text: "No delivery costs for Kathmandu, Pokhara and Biratnagar",
	},
];
