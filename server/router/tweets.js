import express from 'express';
import 'express-async-error';
import * as tweetController from '../controller/tweetController.js';

// 1. const router = express.Router() + export.default router;
// 2. 메모리상에 const tweets 선언
const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets);

// GET /tweets/:id   ,  param은 다른 router에 구현해야함
router.get('/:id', tweetController.getTweet);

// POST /tweets
router.post('/', tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', tweetController.updateTweet);
// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;