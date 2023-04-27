const { decodeToken } = require("../helpers/jwt-encode-decode");
const { User} = require('../models')

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "AccessTokenMissing" };
    }

    const payload = decodeToken(access_token);
    const userData = await User.findByPk(payload.id)

    if(!userData){
        throw { name: "InvalidToken" };
    }

    req.user = payload

    // console.log(req.user.id)
    next()
  } catch (err) {
      next(err)
  }
};

module.exports = authentication;
