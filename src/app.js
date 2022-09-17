import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import session from 'express-session';
import redis from 'redis';
import passport from 'passport';
import passportConfig from './passport/index.js';
import connectRedis from 'connect-redis';
import morgan from 'morgan';

let RedisStore = connectRedis(session);
const app = express();

dotenv.config();

passportConfig();

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({ client: redisClient }),
};

if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
}

let corsOption = {
  origin: '*',
};

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

import { sequelize } from './models/index.js';

app.set('port', process.env.PORT || 3000);

sequelize
  .sync({ alter: false })
  .then(() => console.log('db connect'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

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
