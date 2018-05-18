const path = require('path');

export default {
  "entry": "src/index.js",
  "hash": true,
  "outputPath": "./dist",
  "publicPath": "",
  "html": { "template": "./src/index.ejs" },
  "alias": {
    "src": path.resolve(__dirname, "./src"),
    "assets": path.resolve(__dirname, "./src/assets"),
    "constants": path.resolve(__dirname, "./src/constants"),
    "components": path.resolve(__dirname, "./src/components"),
    "services": path.resolve(__dirname, "./src/services"),
    "utils": path.resolve(__dirname, "./src/utils"),
    "helpers": path.resolve(__dirname, "./src/helpers"),
    "routes": path.resolve(__dirname, "./src/routes"),
    "styles": path.resolve(__dirname, "./src/styles")
  }
}
