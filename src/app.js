import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './passport/index.js';
import morgan from 'morgan';
import sse from 'ssestream';

const app = express();

dotenv.config();

passportConfig();

let corsOption = {
  origin: '*',
};

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(passport.initialize());

import { sequelize } from './models/index.js';

app.set('port', process.env.PORT || 3000);

sequelize
  .sync({ force: false })
  .then(() => console.log('db connect'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.get('/ssetest', (req, res) => {
  const sse1 = new sse(req);
  stream.pipe(res);

  setInterval(() => {
    stream.write({
      data: Date.now().toString(),
    });
  }, 1000);
});

app.use((req, res, next) => {
  const error = new Error(
    `메서드 ${req.method} 경로 ${req.url} 존재하지 않습니다.`
  );
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  return res.status(err.status).json({
    success: false,
    message: err.message,
  });
});

app.listen(app.get('port'), () => console.log('서버 ON'));
