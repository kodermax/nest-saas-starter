// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  reactStrictMode: false,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
