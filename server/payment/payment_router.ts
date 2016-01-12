import * as express from 'express';

import {sendError, formatSend, getAuthorizationData} from '../core/web_util';
import {paymentService} from './payment_service';
import {Payment, ModelOptions} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  paymentService.createOne(req.body)
    .then((payments: Payment) => formatSend(res, payments), (err) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  req.body._id = req.params.id;
  paymentService.updateOne(req.body)
    .then((payments: Payment) => formatSend(res, payments), (err) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  paymentService.removeOneById(req.params.id)
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
  paymentService.findOneById(req.params.id)
    .then((payments: Payment) => formatSend(res, payments), (err: any) => sendError(res, err));
});


export = router;

