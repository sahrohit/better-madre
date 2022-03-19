import { useState } from "react";
import {
	Box,
	Heading,
	Checkbox,
	CheckboxGroup,
	Stack,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderTrack,
	RangeSliderThumb,
	RangeSliderMark,
	Tooltip,
	HStack,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Input,
	Button,
	InputGroup,
	InputRightElement,
	IconButton,
} from "@chakra-ui/react";
import { BiDollar } from "react-icons/bi";
import { useAdmin } from "@contexts/AdminContext";
import AddNewMenuOption from "./AddNewMenuOption";
import { CloseIcon } from "@chakra-ui/icons";

const AdminMenuOption = ({
	showDelete,
	setShowDelete,
	searchText,
	sliderValue,
	setSliderValue,
	setShowCategories,
	setShowCusines,
	showCategories,
	showCusines,
	setSearchText,
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const { adminCategories, adminCusines } = useAdmin();

	const parse = (val) => val.replace(/^\$/, "");

	return (
		<>
			<AddNewMenuOption
				showDelete={showDelete}
				setShowDelete={setShowDelete}
			/>
			<InputGroup my={4}>
				<Input
					w={"full"}
					type="search"
					placeholder="Search"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<InputRightElement>
					<Tooltip label={"Clear"}>
						<IconButton
							size="sm"
							icon={<CloseIcon />}
							onClick={() => {
								setSearchText("");
							}}
						/>
					</Tooltip>
				</InputRightElement>
			</InputGroup>

			<Box h={20}>
				<Heading my={1} size="sm" fontWeight="thin">
					Price Range
				</Heading>

				<RangeSlider
					defaultValue={[0, 100]}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					value={[sliderValue[0] / 100, sliderValue[1] / 100]}
					onChange={(val) =>
						setSliderValue([val[0] * 100, val[1] * 100])
					}
				>
					<RangeSliderTrack bg="red.100">
						<RangeSliderFilledTrack bg="tomato" />
					</RangeSliderTrack>

					<Tooltip
						rounded="full"
						hasArrow
						bg="tomato"
						color="white"
						placement="top"
						isOpen={showTooltip}
						label={`रू ${sliderValue[0]}`}
						closeOnClick={false}
					>
						<RangeSliderThumb boxSize={6} index={0}>
							<Box color="tomato" as={BiDollar} />
						</RangeSliderThumb>
					</Tooltip>

					<Tooltip
						rounded="full"
						hasArrow
						bg="tomato"
						color="white"
						placement="top"
						isOpen={showTooltip}
						label={`रू ${sliderValue[1]}`}
						closeOnClick={false}
					>
						<RangeSliderThumb boxSize={6} index={1}>
							<Box color="tomato" as={BiDollar} />
						</RangeSliderThumb>
					</Tooltip>

					<RangeSliderMark value={0} mt="3" ml="-1" fontSize="sm">
						0
					</RangeSliderMark>
					<RangeSliderMark value={100} mt="3" ml="-4" fontSize="sm">
						10000
					</RangeSliderMark>
				</RangeSlider>
			</Box>
			<HStack justifyContent={"space-around"}>
				<NumberInput
					min={0}
					max={9900}
					value={sliderValue[0]}
					step={100}
					onChange={(val) =>
						setSliderValue([parse(val), sliderValue[1]])
					}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
				<NumberInput
					min={100}
					max={10000}
					value={sliderValue[1]}
					step={100}
					onChange={(val) =>
						setSliderValue([sliderValue[0], parse(val)])
					}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</HStack>

			<Box my={5}>
				<Heading my={1} size="sm" fontWeight="thin">
					Category
				</Heading>
				<CheckboxGroup
					colorScheme="green"
					value={showCategories}
					onChange={(val) => setShowCategories(val)}
				>
					<Stack spacing={1} direction={["column", "column"]}>
						{Array.from(adminCategories).map((category) => {
							return (
								<Checkbox key={category} value={category}>
									{category}
								</Checkbox>
							);
						})}
					</Stack>
				</CheckboxGroup>
			</Box>
			<Box my={5}>
				<Heading my={1} size="sm" fontWeight="thin">
					Cusines
				</Heading>
				<CheckboxGroup
					colorScheme="green"
					value={showCusines}
					onChange={(val) => setShowCusines(val)}
				>
					<Stack spacing={1} direction={["column", "column"]}>
						{Array.from(adminCusines).map((cusine) => {
							return (
								<Checkbox
									key={cusine}
									value={cusine}
									defaultIsChecked
								>
									{cusine}
								</Checkbox>
							);
						})}
					</Stack>
				</CheckboxGroup>
			</Box>
		</>
	);
};

export default AdminMenuOption;
