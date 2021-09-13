import express from 'express';
import 'express-async-error';

// 1. const router = express.Router() + export.default router;
// 2. 메모리상에 const tweets 선언
let tweets = [
  {
    id: '1',
    text: '서버 메모리상의 tweet',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    text: '서버 메모리상의 tweet2222',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
  },
];
const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
  const username = req.query.username; // username || undefined
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
  // json(data): data를 json형태로 전송할때는 send보다 json() 사용
  res.status(200).json(data);
});

// GET /tweets/:id   ,  param은 다른 router에 구현해야함
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// POST /tweets
router.post('/', (req, res, next) => {
  const { text, name, username } = req.body;
  const tweetsLength = tweets.length;
  const tweet = {
    id: Date.now().toString(),
    text,
    name,
    username,
    createdAt: new Date(), //이건 무슨차이지?
    // url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  };
  // 임시로 쓰는 안좋은 방식. DB 사용하면 해결
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});
// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((t) => t.id !== id);
  res.sendStatus(204);
});

export default router;
