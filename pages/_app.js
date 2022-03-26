import "../styles/globals.css";
import theme from "../config/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@contexts/AuthContext";
import { UserProvider } from "@contexts/UserContext";
import Script from "next/script";
import * as gtag from "../lib/gtag";

import TopAlert from "@components/shared/TopAlert";

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<AuthProvider>
				<UserProvider>
					<Script
						strategy="afterInteractive"
						src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
					/>
					<Script
						id="gtag-init"
						strategy="afterInteractive"
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
						}}
					/>
					{/* <TopAlert /> */}
					<Component {...pageProps} />
				</UserProvider>
			</AuthProvider>
		</ChakraProvider>
	);
}

export default MyApp;
