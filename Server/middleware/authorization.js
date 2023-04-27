const { Movie, User } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;

    const moviesData = await Movie.findByPk(id);
    if (!moviesData) {
      throw { name: "NotFound" };
    }

    const user = await User.findByPk(req.user.id);

    if (user.role !== "Admin" && moviesData.authorId !== user.id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorization };
