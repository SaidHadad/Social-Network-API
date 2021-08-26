const router = require('express').Router();

// call the controller functions
const {
  getallUsers,
  getuserbyID,
  createUser,
  updateUser,
  deleteUser
} = require ('../../controllers/userController');

// /api/user
router
  .route('./')
  .get(getallUsers)
  .post(createUser);

// /api/user/:id
router
  .route('/:id')
  .get(getuserbyID)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;