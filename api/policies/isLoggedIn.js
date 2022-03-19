const fs = require("fs");
const path = require("path");
const jsonwebtoken = require("jsonwebtoken");

module.exports = async function (req, res, proceed) {
  const pathToKey = path.resolve("secrets/pub_key.pem");
  const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

  var token = req.headers.authorization;
  token = token.replace("Bearer ", "");

  jsonwebtoken.verify(token, PUB_KEY, async (err, payload) => {
    if (err) return res.status(400).json({ success: false, msg: err.message });

    const user = await User.findOne({ where: { id: payload.sub } });
    if (!user)
      return res
        .status(403)
        .json({ success: false, msg: "the user was not authorized" });
    else proceed();
  });
};
