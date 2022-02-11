import "../styles/globals.css";
import theme from "../config/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@contexts/AuthContext";
import { MenuProvider } from "@contexts/MenuContext";
import { UserProvider } from "@contexts/UserContext";

import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { AnimatePresence } from "framer-motion";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<ChakraProvider theme={theme}>
				<AuthProvider>
					<MenuProvider>
						<UserProvider>
							<Component {...pageProps} />
						</UserProvider>
					</MenuProvider>
				</AuthProvider>
			</ChakraProvider>
		</AnimatePresence>
	);
}

export default MyApp;
