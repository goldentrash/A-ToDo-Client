module.exports = {
  expo: {
    extra: {
      apiServer: process.env.API_SERVER,
      eas: {
        projectId: "896ff724-3702-47b7-9461-c9568d871676",
      },
    },
    owner: "whitepiano",
    name: "A-ToDo",
    slug: "a-todo",
    version: "0.5.0",
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
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
  },
};
