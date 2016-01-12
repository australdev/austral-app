import * as express from 'express';

import {sendError, formatSend, getAuthorizationData} from '../core/web_util';
import {schoolService} from './school_service';
import {School, ModelOptions} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true,
    requireAuthorization: false
  };
  schoolService.createOne(req.body)
    .then((school: School) => formatSend(res, school), (err) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true,
    requireAuthorization: false,
    additionalData: { _id: req.params.id }
  };
  schoolService.updateOne(req.body)
    .then((school: School) => formatSend(res, school), (err) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true,
    requireAuthorization: false
  };
  schoolService.removeOneById(req.params.id)
    .then((school: School) => formatSend(res, school), (err) => sendError(res, err));
});

router.get('/_find', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true,
    requireAuthorization: false
  };
  schoolService.find(req.query, modelOptions)
    .then((schools: School[]) => formatSend(res, schools), (err: any) => sendError(res, err));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true,
    requireAuthorization: false
  };
  schoolService.findOneById(req.params.id)
    .then((school: School) => formatSend(res, school), (err: any) => sendError(res, err));
});


export = router;

