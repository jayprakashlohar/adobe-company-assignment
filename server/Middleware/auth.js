const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const authorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in!" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "secret", (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in!" });
    }
    const { userID } = payload;
    req.body.user_id = userID;

    next();
  });
};

module.exports = { authorization };
