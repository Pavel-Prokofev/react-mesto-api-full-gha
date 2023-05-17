const cardsRouter = require('express').Router();

const {
  createCard,
  returnAllCards,
  dellCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation,
  paramsCardIdValidation,
} = require('../middlewares/validationJoi');

cardsRouter.post('/', createCardValidation, createCard);

cardsRouter.get('/', returnAllCards);

cardsRouter.delete('/:cardId', paramsCardIdValidation, dellCardById);

cardsRouter.put('/:cardId/likes', paramsCardIdValidation, likeCard);

cardsRouter.delete('/:cardId/likes', paramsCardIdValidation, dislikeCard);

module.exports = cardsRouter;
