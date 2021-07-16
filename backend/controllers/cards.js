const Card = require('../models/card');

const ERROR_CODE_400 = 400;
const ERROR_CODE_403 = 403;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

module.exports.getNothing = (req, res) => {
  res.status(ERROR_CODE_404).send({ message: 'Запрашиваемый ресурс не найден' });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(req.user._id)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'Bad Request') return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.createCard = (req, res) => {
  const {
    name, link,
  } = req.body;

  Card.create({
    name, link, owner: req.user._id, likes: [], createdAt: new Date(),
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.deleteCards = (req, res) => {
  Card.findById(req.params.cardId)
    .then((user) => {
      // console.log(typeof (`${user.owner}`));
      // console.log(typeof (req.user._id));
      // console.log(req.user._id === `${user.owner}`);
      if (user === null) {
        res.status(ERROR_CODE_404).send({ message: 'Карточка с указанным _id не найдена.' });
      } else if (`${user.owner}` !== req.user._id) {
        res.status(ERROR_CODE_403).send({ message: 'Удаление чужой карточки' });
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          .then((card) => {
            res.send({ data: card });
          });
      }
    })
    .catch((err) => {
      // console.log(err.name);
      if (err.name === 'CastError') return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные карточки.' });
      if (err.name === 'Not Found') return res.status(ERROR_CODE_404).send({ message: 'Карточка с указанным _id не найдена.' });
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((user) => {
    // console.log(user);
    if (user === null) {
      res.status(ERROR_CODE_404).send({ message: 'Карточка с указанным _id не найдена.' });
    } else {
      res.send({ data: user });
    }
  }).catch((err) => {
    // console.log(err.name);
    if (err.name === 'CastError') return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
    return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.' });
  });
};

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((user) => {
  // console.log(user);
  if (user === null) {
    res.status(ERROR_CODE_404).send({ message: 'Карточка с указанным _id не найдена.' });
  } else {
    res.send({ data: user });
  }
}).catch((err) => {
  if (err.name === 'CastError') return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
  return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.' });
});
