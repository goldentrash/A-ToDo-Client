if (process.env.NODE_ENV !== "production") require("dotenv").config();

module.exports = {
  expo: {
    extra: {
      apiServer: process.env.API_SERVER,
      eas: {
        projectId: "896ff724-3702-47b7-9461-c9568d871676",
      },
    },
    // experiments: { tsconfigPaths: true }, available in SDK 49 and higher
    owner: "whitepiano",
    name: "A-ToDo",
    slug: "a-todo",
    version: "0.4.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    android: {
      package: "pe.kr.whitepiano.a_todo",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
  },
};
