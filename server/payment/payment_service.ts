import {Payment, ModelOptions} from '../../client/core/dto';
import {PaymentModel} from '../core/model';
import {BaseService} from '../core/base_service';

export class PaymentService extends BaseService<Payment> {

	constructor() {
		const defaultModelOptions: ModelOptions = {
			population: 'studyPeriod paymentType'
		};
		super(PaymentModel, defaultModelOptions);
	}

}

export const paymentService = new PaymentService();


