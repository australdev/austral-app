﻿import {Payment, ModelOptions} from '../../client/core/dto';
import {PaymentModel} from '../core/model';
import {BaseService} from '../core/base_service';

export class PaymentService extends BaseService<Payment> {

	constructor() {
		const defaultModelOptions: ModelOptions = {
			population: 'school client frequency'
		};
		super(PaymentModel, defaultModelOptions);
	}

}

export const paymentService = new PaymentService();


