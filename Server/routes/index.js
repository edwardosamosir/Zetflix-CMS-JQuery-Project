const router = require('express').Router()
const moviesRouter =  require('./movies')
const genresRouter = require('./genres')
const usersRouter = require('./users')
const authentication = require('../middleware/authentication')
const errorHandler = require('../middleware/errorHandler')
 
router.use('/users', usersRouter)

// router.use(authentication)
router.use('/movies', authentication, moviesRouter)
router.use('/genres', authentication, genresRouter)

router.use(errorHandler)

module.exports = router;