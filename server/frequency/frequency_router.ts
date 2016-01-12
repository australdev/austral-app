import * as express from 'express';

import {sendError, formatSend, getAuthorizationData} from '../core/web_util';
import {frequencyService} from './frequency_service';
import {Frequency, ModelOptions} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  frequencyService.createOne(req.body)
    .then((frequency: Frequency) => formatSend(res, frequency), (err) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  req.body._id = req.params.id;
  frequencyService.updateOne(req.body)
    .then((frequency: Frequency) => formatSend(res, frequency), (err) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  frequencyService.removeOneById(req.params.id)
    .then((frequency: Frequency) => formatSend(res, frequency), (err) => sendError(res, err));
});

router.get('/_find', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true,
    requireAuthorization: false
  };
  frequencyService.find(req.query, modelOptions)
    .then((frequencys: Frequency[]) => formatSend(res, frequencys), (err: any) => sendError(res, err));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  frequencyService.findOneById(req.params.id)
    .then((frequency: Frequency) => formatSend(res, frequency), (err: any) => sendError(res, err));
});


export = router;

