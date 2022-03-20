const router = require('express').Router();
const thoughtsRoutes = require('./comment-routes');
const userRoutes = require('./pizza-routes');

router.use('/thoughts', thoughtsRoutes);
router.use('/user', userRoutes);

module.exports = router;
