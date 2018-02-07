export default {
  clientPort: 9000,
  serverPort: 3000,
  outputDir: "build",
  aliases: {
    client: {
      components: "common/components",
      stores: "common/stores"
    },
    server: {
      components: "common/components",
      stores: "common/stores",
      services: "server/services"
    }
  }
};
