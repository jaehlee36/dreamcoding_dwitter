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

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
