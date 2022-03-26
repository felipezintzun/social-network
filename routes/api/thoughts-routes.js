const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    addThoughts,
    deleteThoughts,
    updateThoughts
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

module.exports = router;