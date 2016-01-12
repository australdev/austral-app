import {School} from '../../client/core/dto';
import {SchoolModel} from '../core/model';
import {BaseService} from '../core/base_service';

export class SchoolService extends BaseService<School> {

	constructor() {
		super(SchoolModel);
	}

}

export const schoolService = new SchoolService();

