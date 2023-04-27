const router = require('express').Router();
const MovieController = require('../controllers/movieController');
const { authorization } = require('../middleware/authorization');

router.post('/', MovieController.createMovie)
router.get('/', MovieController.getAllMovies)
router.get('/:id', MovieController.getMoviebyId)
router.delete('/:id', authorization, MovieController.deleteMoviebyId)

module.exports = router;