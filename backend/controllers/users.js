const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
require('dotenv').config();

const NotFoundError = require('../errors/not-found-err'); // 404
const BadRequestError = require('../errors/bad-request-err'); // 400
const ServerError = require('../errors/server-err'); // 500

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'Bad Request') {
        const e = new BadRequestError('Переданы некорректные данные при создании пользователя.');
        next(e);
      }
      const e = new ServerError('Ошибка по умолчанию.');
      next(e);
    });
};

module.exports.getUser = (req, res, next) => {
  // console.log(req.params);
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(err);
      } else if (err.name === 'CastError') {
        const e = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
        next(e);
      }
      const e = new ServerError('Ошибка по умолчанию.');
      next(e);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const e = new BadRequestError('Переданы некорректные данные при создании пользователя.');
          next(e);
        }
        const e = new ServerError('Ошибка по умолчанию.');
        next(e);
      }));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      // console.log(err.name);
      if (err.statusCode === 404) {
        next(err);
      }
      if (err.name === 'ValidationError') {
        const e = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
        next(e);
      }
      if (err.name === 'CastError') {
        const e = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
        next(e);
      }
      if (err.name === 'Not Found') {
        const e = new NotFoundError('Пользователь с указанным _id не найден.');
        next(e);
      }
      const e = new ServerError('Ошибка по умолчанию.');
      next(e);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      // console.log(err.name);
      if (err.statusCode === 404) {
        next(err);
      }
      if (err.name === 'ValidationError') {
        const e = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
        next(e);
      }
      if (err.name === 'Not Found') {
        const e = new NotFoundError('Пользователь с указанным _id не найден.');
        next(e);
      }
      const e = new ServerError('Ошибка по умолчанию.');
      next(e);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

      return res.send({ token });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        next(err);
      }
      const e = new ServerError('Ошибка по умолчанию.');
      next(e);
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findOne({ _id: req.user })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        next(err);
      } else if (err.name === 'CastError') {
        const e = new BadRequestError('Переданы некорректные данные при обновлении профиля.');
        next(e);
      }
      const e = new ServerError('Ошибка по умолчанию.');
      next(e);
    });
};
