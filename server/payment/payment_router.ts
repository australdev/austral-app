import * as express from 'express';

import {sendError, formatSend, getAuthorizationData} from '../core/web_util';
import {paymentService} from './payment_service';
import {Payment, ModelOptions} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true
  };
  paymentService.createOne(req.body, modelOptions)
    .then((payments: Payment) => formatSend(res, payments), (err) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true
  };
  paymentService.updateOne(req.body, modelOptions)
    .then((payments: Payment) => formatSend(res, payments), (err) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true
  };
  paymentService.removeOneById(req.params.id, modelOptions)
    .then((payments: Payment) => formatSend(res, payments), (err) => sendError(res, err));
});

router.get('/_find', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true,
    requireAuthorization: false
  };
  paymentService.find(req.query, modelOptions)
    .then((industries: Payment[]) => formatSend(res, industries), (err: any) => sendError(res, err));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true
  };
  paymentService.findOneById(req.params.id, modelOptions)
    .then((payments: Payment) => formatSend(res, payments), (err: any) => sendError(res, err));
});


export = router;

