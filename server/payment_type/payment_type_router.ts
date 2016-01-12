import * as express from 'express';

import {sendError, formatSend, getAuthorizationData} from '../core/web_util';
import {paymentTypeService} from './payment_type_service';
import {PaymentType, ModelOptions} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  paymentTypeService.createOne(req.body)
    .then((paymentType: PaymentType) => formatSend(res, paymentType), (err) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  req.body._id = req.params.id;
  paymentTypeService.updateOne(req.body)
    .then((paymentType: PaymentType) => formatSend(res, paymentType), (err) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  paymentTypeService.removeOneById(req.params.id)
    .then((paymentType: PaymentType) => formatSend(res, paymentType), (err) => sendError(res, err));
});

router.get('/_find', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true,
    requireAuthorization: false
  };
  paymentTypeService.find(req.query, modelOptions)
    .then((paymentTypes: PaymentType[]) => formatSend(res, paymentTypes), (err: any) => sendError(res, err));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  paymentTypeService.findOneById(req.params.id)
    .then((paymentType: PaymentType) => formatSend(res, paymentType), (err: any) => sendError(res, err));
});


export = router;

