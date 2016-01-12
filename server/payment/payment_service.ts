import {Payment} from '../../client/core/dto';
import {PaymentModel} from '../core/model';
import {BaseService} from '../core/base_service';

export class PaymentService extends BaseService<Payment> {

	constructor() {
		super(PaymentModel);
	}

}

export const paymentService = new PaymentService();

