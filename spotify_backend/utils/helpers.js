const jwt = require('jsonwebtoken');
require('dotenv').config()
// Define a secret key (ideally, this should be in an environment variable)
const JWT_SECRET = process.env.SECRET_KEY;

// Export the function properly using module.exports
module.exports = {
    getToken: async (email, user) => {
        // Sign the token with user identifier and secret key
        const token = jwt.sign({ identifier: user._id }, JWT_SECRET);
        return token;
    }
};
