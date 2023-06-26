require('dotenv').config();

module.exports = {
  expo: {
    extra: {
      apiServer: process.env.API_SERVER,
      eas: {
        projectId: process.env.PROJECT_ID,
      },
    },
    owner: 'whitepiano',
    name: 'A-ToDo',
    slug: 'a-todo',
    version: '0.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    android: {
      package: 'pe.kr.whitepiano.a_todo',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
  },
};
