import "../styles/globals.css";
import theme from "../config/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@contexts/AuthContext";
import { MenuProvider } from "@contexts/MenuContext";
import { AdminProvider } from "@contexts/AdminContext";
import { UserProvider } from "@contexts/UserContext";

import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<MenuProvider>
					<AdminProvider>
						<UserProvider>
							<Component {...pageProps} />
						</UserProvider>
					</AdminProvider>
				</MenuProvider>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
