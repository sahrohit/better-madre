import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

export const ThemeMode = {
	Light: "light",
	Dark: "dark",
};

export const mobileBreakpointsMap = {
	base: true,
	md: true,
	lg: true,
	xl: false,
};

// Theme Config
const config = {
	initialColorMode: ThemeMode.Light,
	useSystemColorMode: false,
};

const colors = {
	black: "#121212",
};

const styles = {
	global: (props) => ({
		body: {
			color: mode("gray.800", "whiteAlpha.900")(props),
			bg: mode("gray.100", "#121212")(props),
		},
	}),
};

const textVariants = {
	// '#0D5074', '#B4ABF9'
	emphasis: (props) => ({
		// color: mode('#3F72AF', '#30E3CA')(props),
		// color: mode('#0D5074', '#B4ABF9')(props),
		color: mode("#3F72AF", "#30E3CA")(props),
	}),
	description: (props) => ({
		color: mode("gray.800", "gray.400")(props),
	}),
	accent: (props) => ({
		color: mode("black.400", "#30E3CA")(props),
	}),
	accentAlternative: (props) => ({
		color: mode("#595959", "#A6A6A6")(props),
	}),
};

const theme = extendTheme({
	config,
	fonts: {
		body: "Poppins",
	},
	colors,
	styles,
	components: {
		Steps,
		Link: {
			baseStyle: (props) => ({
				color: mode("#3F72AF", "#30E3CA")(props),
			}),
			variants: {
				...textVariants,
				description: (props) => ({
					color: mode("gray.800", "gray.400")(props),
					_hover: {
						color: mode("#3F72AF", "#30E3CA")(props),
						textDecoration: "none",
					},
				}),
			},
		},
		Text: {
			variants: textVariants,
		},
		Heading: {
			variants: textVariants,
		},
		Button: {
			variants: {
				outline: (props) => ({
					borderColor: mode("white.400", "#30E3CA")(props),
				}),
			},
		},
	},
});

export default theme;
