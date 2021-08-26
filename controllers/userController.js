const { Thought, User } = require('../models');

const userController = {

  // get all users
  getallUsers(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .select('___v')
    .sort({ _id: -1 })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },
  
  // getuserbyID
  getuserbyId({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .then(userData => {
      if(!userData) {
        res.status(400).json({ message: 'No user found with this id!'});
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // createUser,
  createUser({ body }, res) {
    User.create(body)
    .then(userData => res.json(userData))
    .catch(err => res.status(400).json(err));
  },
  
  // updateUser,
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidadots: true })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user with this id was found' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.status(400).json(err)
    );
  },

  // deleteUser,
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.status(400).json(err));
  },

  // addFriend,
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id },{ $push: { friends: params.friendId } },{ new: true, runValidators: true })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user with this id was found' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.json(err));
  },
  
  // deleteFriend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id },{ $pull: { friends: params.friendId } },{ new: true })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user with this id was found' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.status(400).json(err));
  }
}

module.exports = userControllerl;