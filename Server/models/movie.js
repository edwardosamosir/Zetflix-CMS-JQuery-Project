'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, {as : 'author', foreignKey: "authorId" })
      Movie.belongsTo(models.Genre, {foreignKey: "genreId"})
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required!" },
        notEmpty: { msg: "Title is required!" },
      },
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Synopsis is required!" },
        notEmpty: { msg: "Synopsis is required!" },
      },
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Rating is required!" },
        notNull: { msg: "Rating is required!" },
        min: {
          args: 1,
          msg: "Minimum Rating 1",
        },
      },
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};