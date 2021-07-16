const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getNothing, getCards, createCard, deleteCards, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string(),
  }),
}), createCard);
router.delete('/cards/:cardId', deleteCards);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);
router.get('/*', getNothing);
router.post('/*', getNothing);

module.exports = router;
