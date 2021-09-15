import express from 'express';
import 'express-async-error';
import { body, query } from 'express-validator'
import * as tweetController from '../controller/tweetController.js';
import { validate } from '../middleware/validate.js'
// 1. const router = express.Router() + export.default router;
// 2. 메모리상에 const tweets 선언
// ...

// validation, sanitization, (심화: Contract Testing: Client-Server, Proto-based 검증)
const router = express.Router();


// GET /tweets
// GET /tweets?username=:username
router.get('/', 
[
  query('username').trim().isLength({min: 2, max:14}).withMessage("길이 부적절"),
  validate
],
tweetController.getTweets);

// GET /tweets/:id   ,  param은 다른 router에 구현해야함
router.get('/:id',tweetController.getTweet);

// POST /tweets
router.post('/', [
  body('text').trim().isLength({ min: 3}).withMessage('text should be at least 3 characters'),
  validate
], tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', tweetController.updateTweet);
// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;