const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
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
		domains: ["source.unsplash.com", "lh3.googleusercontent.com"],
	},
});
