const router = require('express').Router();

const { 
  getThought, 
  getthoughtId, 
  addThought, 
  updateThought,
  addReaction,
  removeThought,
  removeReaction
} = require('../../controllers/thoughtController');


// /api/thoughts
router
  .route('/')
  .get(getThought);

  // /api/thoughts/:id
router
  .route('/:id')
  .get(getthoughtId)
  .put(updateThought)
  .delete(removeThought);

// this route because the thought is linked to a specific userid
// /api/thoughts/:userId
router
  .route('/:userId')
    .post(addThought);

// /api/thoughts/:thoughtId/reactions
router
  .route('/toughtId/reaction')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactionId
router
  .route('/toughtId/reaction/reactionId')
  .delete(removeReaction);

module.exports = router;