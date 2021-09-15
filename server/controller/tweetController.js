import * as tweetRepository from '../data/tweetRepository.js';

export async function getTweets(req, res, next) {
  const username = req.query.username; // username || undefined
  const data = await (username
    ? tweetRepository.getAllTweetsByUsername(username)
    : tweetRepository.getAllTweets());
  // json(data): data를 json형태로 전송할때는 send보다 json() 사용
  res.status(200).json(data);
}
export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getTweetById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}
export async function createTweet(req, res, next) {
  const { text, name, username } = req.body;
  const tweet = await tweetRepository.createTweet(text, name, username);
  res.status(201).json(tweet);
}
export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.updateTweet(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}
export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  tweetRepository.deleteTweet(id);
  res.sendStatus(204);
}
