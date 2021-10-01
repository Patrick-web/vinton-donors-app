module.exports = {
	devServer: {
		disableHostCheck: true,
	},
	transpileDependencies: ["vuetify"],

	publicPath: "",

	pluginOptions: {
		cordovaPath: "src-cordova",
	},
	pwa: {
		name: "Donors X",
		themeColor: "#DC143C",
		msTileColor: "#000000",
		icons: {
			favicon32: "img/icons/favicon-32x32.png",
			favicon16: "img/icons/favicon-16x16.png",
			appleTouchIcon: "img/icons/apple-icon-152x152.png",
			msTileImage: "img/icons/ms-icon-144x144.png",
		},
	},
};
