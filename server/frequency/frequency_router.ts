import * as express from 'express';

import {sendError, formatSend, getAuthorizationData} from '../core/web_util';
import {frequencyService} from './frequency_service';
import {Frequency, ModelOptions} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    requireAuthorization: false
  };
  frequencyService.createOne(req.body, modelOptions)
    .then((frequency: Frequency) => formatSend(res, frequency), (err: Error) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    requireAuthorization: false,
    additionalData: { _id: req.params.id }
  };
  req.body.
  frequencyService.updateOne(req.body, modelOptions)
    .then((frequency: Frequency) => formatSend(res, frequency), (err: Error) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    requireAuthorization: false
  };
  frequencyService.removeOneById(req.params.id, modelOptions)
    .then((frequency: Frequency) => formatSend(res, frequency), (err: Error) => sendError(res, err));
});

router.get('/_find', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true,
    requireAuthorization: false
  };
  frequencyService.find(req.query, modelOptions)
    .then((frequencys: Frequency[]) => formatSend(res, frequencys), (err: Error) => sendError(res, err));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    requireAuthorization: false
  };
  frequencyService.findOneById(req.params.id, modelOptions)
    .then((frequency: Frequency) => formatSend(res, frequency), (err: Error) => sendError(res, err));
});


export = router;

