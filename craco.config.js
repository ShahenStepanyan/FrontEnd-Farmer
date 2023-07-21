const CracoLessPlugin = require("craco-less");
const theme = require("./src/utils/theme.json");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { ...theme },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
