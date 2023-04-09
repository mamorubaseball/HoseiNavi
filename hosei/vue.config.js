const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "https://notion-api.splitbee.io": {
        target: "http://localhost:8080",
      }
    }
  }

});


