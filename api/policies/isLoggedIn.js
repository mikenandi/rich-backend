// Module imports.
const fs = require("fs"); // ::module for accessing file system.
const path = require("path"); // ::module for getting path of the file.
const jsonwebtoken = require("jsonwebtoken"); // ::module for verifying token.

module.exports = async function (req, res, proceed) {
    // getting public key.
    const pathToKey = path.resolve("secrets/pub_key.pem");
    const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

    // getting token from authorization headers.
    let token = req.headers.authorization;

    // Response when token length is 0 or not a token.
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "no token was provided." });

    // getting the actual token by replacing the bearer.
    token = token.replace("Bearer ", "");

    // verifying token.
    jsonwebtoken.verify(token, PUB_KEY, async (err, payload) => {
        if (err)
            return res.status(400).json({ success: false, msg: err.message });
        else proceed();
    });
};
