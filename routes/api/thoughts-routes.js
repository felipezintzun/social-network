const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    addThoughts,
    deleteThoughts,
    updateThoughts,
    addReactions,
    deleteReactions
} = require('../../controllers/thoughts-controller');

// get all thoughts - create thought
router.route('/')
.get(getAllThoughts)
.post(addThoughts)

// get thought by id, update, delete thought
router.route('/:id')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts)

router.route('/:id/reactions')
.post(addReactions)

router.route('/:id/reactions/:reactionsId')
.delete(deleteReactions)

module.exports = router;