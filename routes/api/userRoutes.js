const router = require('express').Router();

// call the controller functions
const {
  getallUsers,
  getuserbyId,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require ('../../controllers/userController');

// /api/user
router
  .route('./')
  .get(getallUsers)
  .post(createUser);

// /api/user/:id
router
  .route('/:id')
  .get(getuserbyId)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('./:id/friend/:friendId')
  .put(addFriend)
  .delete(deleteFriend)

module.exports = router;