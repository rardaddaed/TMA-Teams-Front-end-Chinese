const { override, fallback } = require("customize-cra");

module.exports = override(
  fallback({
    crypto: false
  })
);
