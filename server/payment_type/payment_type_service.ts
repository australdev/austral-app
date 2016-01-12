import {PaymentType} from '../../client/core/dto';
import {PaymentTypeModel} from '../core/model';
import {BaseService} from '../core/base_service';

export class PaymentTypeService extends BaseService<PaymentType> {

	constructor() {
		super(PaymentTypeModel);
	}

}

export const paymentTypeService = new PaymentTypeService();

