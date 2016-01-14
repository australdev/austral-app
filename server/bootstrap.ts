import * as connectLivereload from 'connect-livereload';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import {resolve} from 'path';

import {APP_BASE, LIVE_RELOAD_PORT, PATH, PORT} from '../tools/config';
import {authentication} from './authentication/authentication_middleware';
import * as userRouter from './user/user_router';
import * as paymentTypeRouter from './payment_type/payment_type_router';
import * as paymentRouter from './payment/payment_router';
import * as frequencyRouter from './frequency/frequency_router';
import * as schoolRouter from './school/school_router';
import * as aquiredProgramRouter from './aquired_program/aquired_program_router';
import * as loginRouter from './login/login_router';
import * as signupRouter from './signup/signup_router';
import * as clientRouter from './client/client_router';

const INDEX_DEST_PATH = resolve(PATH.cwd, PATH.dest.app.base, 'index.html');

const server = express();

server.use(
  APP_BASE,
  connectLivereload({ port: LIVE_RELOAD_PORT }),
  serveStatic(resolve(PATH.cwd, PATH.dest.app.base))
);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.all('/api/*', authentication.validate);
server.use('/api/user', userRouter);
server.use('/api/payment-type', paymentTypeRouter);
server.use('/api/payment', paymentRouter);
server.use('/api/frequency', frequencyRouter);
server.use('/api/school', schoolRouter);
server.use('/api/aquired-program', aquiredProgramRouter);
server.use('/api/login', loginRouter);
server.use('/api/signup', signupRouter);
server.use('/api/client', clientRouter);

server.all(APP_BASE + '*', (req, res) =>
  res.sendFile(INDEX_DEST_PATH)
);

server.listen(PORT, () => {
  const url = 'http://localhost:' + PORT + APP_BASE;
  if (process.env.RESTART) {     
    console.log('Server restarted at: ', url);
  } else {
    openResource(url);
    console.log('Server started at: ', url);
  }
});

