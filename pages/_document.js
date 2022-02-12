import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="icons/apple-icon-180.png"
				/>
				<meta name="theme-color" content="#edf2f7" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
