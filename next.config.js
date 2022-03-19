const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
	withPWA({
		productionBrowserSourceMaps: true,
		i18n: {
			locales: ["en"],
			defaultLocale: "en",
		},
		pwa: {
			dest: "public",
			register: true,
			skipWaiting: true,
			runtimeCaching,
			disable: process.env.NODE_ENV === "development",
		},
		swcMinify: true,
		reactStrictMode: true,
		images: {
			domains: [
				"source.unsplash.com",
				"lh3.googleusercontent.com",
				"images.unsplash.com",
			],
		},
	})
);
