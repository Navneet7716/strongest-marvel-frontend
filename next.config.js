const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy()({
  images: {
    domains: ["i.annihil.us"],
    minimumCacheTTL: 6000000,
  },
});