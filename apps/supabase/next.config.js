const withTM = require("next-transpile-modules")(["ui", "dummy_data_generation"]);

module.exports = withTM({
  reactStrictMode: true,
});
