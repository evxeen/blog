import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен сожержать минимум 5 символов').isLength({ min: 5 }),
  body('fullname', 'Уажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'неверная ссылка на аватарку').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен сожержать минимум 5 символов').isLength({ min: 5 }),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 5 }).isString(),
  body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
  body('imageUrl', 'неверная ссылка на изображенин').optional().isString(),
];
