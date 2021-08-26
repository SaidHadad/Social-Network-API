const router = require('express').Router();
const {
  getTought,
  gettoughtId,
  addTought,
  updateTought,
  removeTought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router
  .route('/')
  .get(getTought);

  // /api/thoughts/:id
router
  .route('/:id')
  .get(gettoughtId)
  .put(updateTought)
  .delete(removeTought);

// this route because the thought is linked to a specific userid
// /api/thoughts/:userId
router
  .route('/:userId')
    .post(addTought);

// /api/thoughts/:thoughtId/reactions
router
  .route('/toughtId/reaction')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactionId
router
  .route('/toughtId/reaction/reactionId')
  .delete(removeReaction);

module.exports = router;