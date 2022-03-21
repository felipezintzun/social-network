const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateFriend
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
// /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// friends
router.route ("/:id/:friendsid")
  .put(updateFriend)

// Set up GET one, PUT, and DELETE at /api/users/:id
// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;