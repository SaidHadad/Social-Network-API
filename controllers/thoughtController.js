const { Thought, User } = require('../models');

const thoughtController = {
  
  // addTought,
  addThought({ params, body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate({ _id: params.userId }, { $push: { thoughts: _id } }, { new: true, runValidators: true });
    })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'Nothought found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  
  // getTought,
  getThought(req, res) {
    Thought.find({})
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },
  
  // gettoughtId,
  getthoughtId({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(400).json({ message: 'No thought with this id!'});
        return
      }
      res.json(dbThoughtData);
    })
    .catch(err => {res.status(400).json(err)});
  },

  // updateTought,
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  },

  // removeTought,
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(removeThought => {
      if (!removeThought) {  
        return res.status(404).json({ message: 'No thought with this id!' }
        );
      }
      return User.findOneAndUpdate(
        { _id: params.userId }, { $pull: { thoughts: params.id } }, { new: true }
      );
    })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },

  // addReaction,
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },

  // removeReaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate( { _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;