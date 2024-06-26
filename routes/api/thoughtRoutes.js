const router= require('express').Router();
const{
  getAllThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
}= require('../../controllers/thoughtController')


//   /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createNewThought)

//   /api/thoughts/:thoughId
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought)

//  /api/thoughts/:thoughId/reactions
router.route ('/:thoughtId/reactions')
.post(createReaction)

//  /api/thoughts/:thoughId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports= router


