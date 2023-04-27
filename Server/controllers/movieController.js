const { Movie, User, Genre, sequelize } = require("../models");


class MovieController {
  static async createMovie(req, res, next) {
    const { title, synopsis, imgUrl, trailerUrl, rating, genreId } = req.body;
    const authorId  = req.user.id;
    // console.log(req.user.id)
    try {
      const addedMovie = await Movie.create({
        title,
        synopsis,
        imgUrl,
        trailerUrl,
        rating,
        genreId,
        authorId,
      });

      res.status(201).json(
        {addedMovie,
          message: `Succesfully Added ${addedMovie.title} Movie!`
        }
      );

    } catch (err) {
      next(err)
    }
  }

  static async getAllMovies(req, res, next) {
    try {
      const allMovies = await Movie.findAll({
        include: [{model: User, as : 'author', attributes: {exclude: "password"}}, Genre],
        order: [["title", "ASC"]]
      });

      res.status(200).json(
        allMovies
      );

    } catch (err) {
        next(err);
    }
  }

  static async getMoviebyId(req, res, next) {
    try {
      const {id} = req.params
      const selectedMovieById = await Movie.findByPk(id, {
        include: [{model: User, as : 'author', attributes: {exclude: "password"}}, Genre]
      });

      if(!selectedMovieById) throw ({name: "NotFound"})

      res.status(200).json(
        selectedMovieById
      );

    } catch (err) {
      next(err);
    }
  }

  static async deleteMoviebyId(req, res, next) {
    try {
      const {id} = req.params
      const movieToDelete = await Movie.findByPk(id);

      if(!movieToDelete) throw ({name: "NotFound"})

      await Movie.destroy({
        where: {id}
      })

      res.status(200).json({
        message: `Successfully Removed ${movieToDelete.title} Movie.`
      }
      );

    } catch (err) {
      next(err);
    }
  }

  static async getAllGenres(req, res, next) {
    try {
      const allGenres = await Genre.findAll({
        order: [["name", "ASC"]]
    });

      res.status(200).json(
        allGenres
      );

    } catch (err) {
        next(err);
    }
  }

  static async createGenre(req, res, next) {
    const { name } = req.body;

    try {
      const addedGenre = await Genre.create({
        name
      });

      res.status(201).json(
        {addedGenre,
         message: `Successfully Added ${addedGenre.name} Genre.`
        }
      );

    } catch (err) {
      next(err)
    }
  }

  static async deleteGenrebyId(req, res, next) {
    try {
      const {id} = req.params
      const genreToDelete = await Genre.findByPk(id);

      if(!genreToDelete) throw ({name: "NotFound"})

      await Genre.destroy({
        where: {id}
      })

      res.status(200).json({
        message: `Successfully Removed ${genreToDelete.name} Genre.`
      }
      );

    } catch (err) {
      next(err);
    }
  }

}

module.exports = MovieController;
