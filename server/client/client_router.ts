import * as express from 'express';

import {sendError, getAuthorizationData, formatSend} from '../core/web_util';
import {clientService} from './client_service';
import {Client, ModelOptions} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true
  };
  clientService.createOne(req.body, modelOptions)
    .then((client: Client) => formatSend(res, client), (err) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    additionalData: { _id: req.params.id }
  };
  clientService.updateOne(req.body, modelOptions)
    .then((client: Client) => formatSend(res, client), (err) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  clientService.removeOneById(req.params.id, modelOptions)
    .then((client: Client) => formatSend(res, client), (err) => sendError(res, err));
});

router.get('/_find', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  clientService.find(req.query, modelOptions)
    .then((clients: Client[]) => formatSend(res, clients), (err: any) => sendError(res, err));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  clientService.findOneById(req.params.id, modelOptions)
    .then((client: Client) => formatSend(res, client), (err: any) => sendError(res, err));
});


export = router;
