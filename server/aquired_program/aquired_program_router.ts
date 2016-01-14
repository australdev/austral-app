import * as express from 'express';

import {sendError, formatSend, getAuthorizationData} from '../core/web_util';
import {aquiredProgramService} from './aquired_program_service';
import {AquiredProgram, ModelOptions} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  aquiredProgramService.createOne(req.body, modelOptions)
    .then((aquiredProgram: AquiredProgram) => formatSend(res, aquiredProgram), (err) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    additionalData: { _id: req.params.id }
  };
  aquiredProgramService.updateOne(req.body, modelOptions)
    .then((aquiredProgram: AquiredProgram) => formatSend(res, aquiredProgram), (err) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  aquiredProgramService.removeOneById(req.params.id, modelOptions)
    .then((aquiredProgram: AquiredProgram) => formatSend(res, aquiredProgram), (err) => sendError(res, err));
});

router.get('/_find', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    regularExpresion: true
  };
  aquiredProgramService.find(req.query, modelOptions)
    .then((aquiredPrograms: AquiredProgram[]) => formatSend(res, aquiredPrograms), (err: any) => sendError(res, err));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  aquiredProgramService.findOneById(req.params.id, modelOptions)
    .then((aquiredProgram: AquiredProgram) => formatSend(res, aquiredProgram), (err: any) => sendError(res, err));
});


export = router;

