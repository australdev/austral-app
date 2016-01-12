import {Frequency} from '../../client/core/dto';
import {FrequencyModel} from '../core/model';
import {BaseService} from '../core/base_service';

export class FrequencyService extends BaseService<Frequency> {

	constructor() {
		super(FrequencyModel);
	}

}

export const frequencyService = new FrequencyService();

