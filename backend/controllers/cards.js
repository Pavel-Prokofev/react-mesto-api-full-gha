const Card = require('../models/card');
const {
  statusCreatingOk,
  orFailFunction,
} = require('../utils/errorsHandler');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => res.status(statusCreatingOk).send(newCard))
    .catch(next);
};

const returnAllCards = (req, res, next) => {
  Card.find({})
    .then((allCards) => res.send(allCards))
    .catch(next);
};

const dellCardById = (req, res, next) => {
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw orFailFunction('Forbidden');
      }
      return Card.deleteOne(card)
        .then(() => res.send({ message: 'Карточка удалена.' }))
        .catch(next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  createCard,
  returnAllCards,
  dellCardById,
  likeCard,
  dislikeCard,
};
