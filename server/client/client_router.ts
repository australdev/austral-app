import * as express from 'express';

import {sendError} from '../core/web_util';
import {clientService} from './client_service';
import {Client} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  clientService.createOne(req.body)
    .then((client: Client) => res.send(client), (err) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  req.body._id = req.params.id;
  clientService.updateOne(req.body)
    .then((client: Client) => res.send(client), (err) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  clientService.removeOneById(req.params.id)
    .then((client: Client) => res.send(client), (err) => sendError(res, err));
});

router.get('/', (req: express.Request, res: express.Response) => {
  clientService.find(req.query)
    .then((clients: Client[]) => res.send(clients), (err: any) => sendError(res, err));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  clientService.findOneById(req.params.id)
    .then((client: Client) => res.send(client), (err: any) => sendError(res, err));
});


export = router;
