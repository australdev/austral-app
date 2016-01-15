import {AquiredProgram, ModelOptions} from '../../client/core/dto';
import {AquiredProgramModel} from '../core/model';
import {BaseService} from '../core/base_service';

export class AquiredProgramService extends BaseService<AquiredProgram> {

	constructor() {
		const defaultModelOptions: ModelOptions = {
			population: 'school client frequency'
		};
		super(AquiredProgramModel, defaultModelOptions);
	}

}

export const aquiredProgramService = new AquiredProgramService();

