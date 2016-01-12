import {AquiredProgram} from '../../client/core/dto';
import {AquiredProgramModel} from '../core/model';
import {BaseService} from '../core/base_service';

export class AquiredProgramService extends BaseService<AquiredProgram> {

	constructor() {
		super(AquiredProgramModel);
	}

}

export const aquiredProgramService = new AquiredProgramService();

