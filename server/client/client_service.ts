import {Client} from '../../client/core/dto';
import {ClientModel} from '../core/model';
import {BaseService} from '../core/base_service';


export class ClientService extends BaseService<Client> {

	constructor() {
		super(ClientModel);
	}

}


export const clientService = new ClientService();
