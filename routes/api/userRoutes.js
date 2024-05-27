const router= require('express').Router();
const{
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addNewFriend,
  deleteFriend
} = require('../../controllers/userController');


//  /api/users
router.route('/')
  .get(getAllUsers)
  .post(createNewUser)

//  /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)



//   /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addNewFriend)
  .delete(deleteFriend)

module.exports= router;