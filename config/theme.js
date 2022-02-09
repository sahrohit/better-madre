import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

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
				outlineAlternative: (props) => ({
					borderWidth: "1px",
					borderRadius: 0,
					borderColor: mode("#595959", "whiteAlpha.500")(props),
					_hover: {
						backgroundColor: mode(
							"rgba(49, 151, 149, 0.06)",
							"rgba(157, 236, 249, 0.06)"
						)(props),
					},
				}),
			},
		},
		Icon: {
			variants: {
				accent: (props) => ({
					borderColor: mode("gray.800", "gray.400")(props),
				}),
			},
		},
		Divider: {
			variants: {
				solid: (props) => ({
					borderColor: mode("gray.800", "gray.400")(props),
					marginLeft: "auto",
					marginRight: "auto",
				}),
			},
		},
		Menu: {
			variants: {
				test: (props) => ({
					backgroundColor: mode("#fc4553", "#fc4553")(props),
					color: mode("#fc4553", "#fc4553")(props),
					_hover: {
						backgroundColor: mode("#fc4553", "#fc4553")(props),
					},
				}),
			},
		},
		Drawer: {
			variants: {
				default: (props) => ({
					color: mode("gray.800", "whiteAlpha.900")(props),
					bg: mode("gray.100", "#121212")(props),
					// _hover: {
					// 	backgroundColor: mode("#fc4553", "#fc4553")(props),
					// },
				}),
			},
		},
	},
});

export default theme;
