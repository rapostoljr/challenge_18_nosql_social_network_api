const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend, 
    removeFriend,
} = require('../../controllers/user-controller.js');

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
   .get(getOneUser)
   .put(updateUser)
   .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:usersId/friends/:friendId')
    .post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:usersId/friends/:friendId')
    .delete(removeFriend);

module.exports = router;