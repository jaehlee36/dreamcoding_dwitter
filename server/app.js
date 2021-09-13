import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-error';
import tweetsRouter from './router/tweets.js';
// 1.여러 필요한 라이브러리 app.use를 통해 선언 + app.listen(8080)
// ex)const app = express(); 을 포함한

// 2. 필요할 경우 Route 선언
// ex) app.use('/tweets', tweetsRoute)

// 3. 아랫쪽에 모든 요청이 안불렸을때, 에러났을때의 미들웨어 작성
// ex) res.sendStatus(404);
// ex) res.sendStatus(500);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);

/////////////
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, DELETE'
//   );
//   next();
// });
// app.get('/tweets', (req, res, next) => {
//   console.log('yes /tweets');
//   // query는 /tweets?username=:username 식으로 app.get 새로만들지 말고 여기다 조건문 추가?
//   if (req.query.username) {
//     res.send(tweets.filter((tweet) => tweet.username === req.query.username));
//   }
//   res.send(tweets);
// });
// app.get('/tweets/:id', (req, res, next) => {
//   // PARAMS는 STRING이라 NUMBER로 변환해줘야함
//   // FILTER함수는 RETURN 값 있어야함
//   const filtered = tweets.filter((tweet) => tweet.id === Number(req.params.id));
//   res.send(filtered);
// });
// app.post('/tweets', (req, res) => {
//   tweets.push(req.body);
//   res.status(201).send(tweets);
// });

// app.put('/tweets/:id', (req, res, next) => {
//   const tweet = tweets.find((tweet) => tweet.id === Number(req.params.id));
//   if (!tweet) res.status(404).send('sorry, id not found!');

//   tweet.text = req.body.text;
//   res.status(200).send(tweet);
// });
// app.delete('/tweets/:id', (req, res, next) => {
//   tweets = tweets.filter((tweet) =>  tweet.id !== parseInt(req.params.id)
//   );
//   res.status(204).send(tweets);
// });

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
