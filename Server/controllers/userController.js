const { User } = require("../models");
const { compareHash } = require("../helpers/password-hashing-bcrypt");
const { encodeToken } = require("../helpers/jwt-encode-decode");
const { randomString } = require("../helpers/random-string");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async registerNewAdmin(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;

    try {
      const newAdmin = await User.create({
        username,
        email,
        password,
        role: "Admin",
        phoneNumber,
        address
      });

      res.status(201).json({
        id: newAdmin.id,
        email: newAdmin.email,
        message: `User with email ${newAdmin.email} and username ${newAdmin.username} is succesfully registered`
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email) {
        throw { name: "email_is_required" };
      }
      if (!password) {
        throw { name: "password_is_required" };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "wrong_email_or_password" };
      }

      const isPasswordCorrect = compareHash(password, user.password);
      if (!isPasswordCorrect) {
        throw { name: "wrong_email_or_password" };
      }

      const encodedToken = encodeToken({ id: user.id });

      res.status(200).json({
        access_token: encodedToken,
        username: user.username,
        email: user.email,
        role: user.role,
        message: `${user.username} is successfully logged in`
      });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
      try {
        // console.log(req.headers.google_access_token);
        const googleAccessToken = req.headers.google_access_token;
        const client = new OAuth2Client(
          "794142405359-n7ub7rrvk7nolpej3rf6f52g1k81njsl.apps.googleusercontent.com"
        );

        const ticket = await client.verifyIdToken({
          idToken: googleAccessToken,
          audience:
            "794142405359-n7ub7rrvk7nolpej3rf6f52g1k81njsl.apps.googleusercontent.com" // Specify the CLIENT_ID of the app that accesses the backend
        });

        const payload = ticket.getPayload();
        // console.log(payload);

        const { name, email } = payload;

        const password = randomString(20);
        // console.log(password)
        const [newUser, created] = await User.findOrCreate({
          where: { email },
          defaults: {
            username: name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 99999),
            email,
            password: password,
            role: "Staff"
          }
          // hooks: false
        });

        // console.log(payload, { newUser, created}, "<<<< Cek ini!!!");

        const encodedToken = encodeToken({ id: newUser.id });

        let role = newUser.role;
        let username = newUser.username;

        let code, message;
        if (created) {
          code = 201;
          message = `User with email ${email} and username ${username} is succesfully registered`;
        } else {
          code = 200;
          message = `${username} is successfully logged in`;
        }

        res.status(code).json({
          access_token: encodedToken,
          username: username,
          email: email,
          role: role,
          message: message
        });
      }
      catch (err) {
        next(err);
      }
    }
}

module.exports = UserController;
