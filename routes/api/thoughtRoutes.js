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

router.route ('./thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction);

module.exports= router


