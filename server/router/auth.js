import express from 'express';
import 'express-async-error';
import { body }from 'express-validator'
import * as authController from '../controller/authController.js';
import { validate } from './../middleware/validate.js';

const router = express.Router();

const validateCredential = [
  body('username').trim().isLength({min: 2}).withMessage('username is at lease 2 characters'),
  body('password').trim().isLength({min: 5}).withMessage('username is at lease 5 characters'),
  validate,
]
const validateSignup = [
  ...validateCredential,
  body('name').trim().notEmpty().withMessage('name empty'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url').isURL().withMessage('invalid url').optional({nullable: true, checkFalsy: true}),
  validate,
];


router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);

export default router;