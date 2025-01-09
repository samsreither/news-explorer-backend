const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // each IP can make 100 requests per 10 minutes
  standardHeaders: true, // Return rate limit info in the RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});