import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен сожержать минимум 5 символов').isLength({ min: 5 }),
  body('fullname', 'Уажите имя').isLength({ min: 3 }),
  body('avatarUrl', 'неверная ссылка на аватарку').optional().isURL(),
];
