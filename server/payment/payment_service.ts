import {Payment, PaymentSearch, ModelOptions} from '../../client/core/dto';
import {PaymentModel, CoeModel, StudentModel, InstitutionModel} from '../core/model';
import {BaseService} from '../core/base_service';
import {ObjectUtil} from '../../client/core/util';
import {xlsxService} from '../xlsx/xlsx_service';

export class PaymentService extends BaseService<Payment> {

	constructor() {
		const defaultModelOptions: ModelOptions = {
			population: 'studyPeriod paymentType'
		};
		super(PaymentModel, defaultModelOptions);
	}

	downloadData(data: PaymentSearch, newOptions: ModelOptions = {}): Promise<string> {

		const studentPopulation = {
			path: 'student', 
			model: StudentModel	
		};
		
		const institutionPopulation = {
			path: 'institution', 
			model: InstitutionModel
		};
		
		// Add search filters
		if (data.student && data.student._id) {
			studentPopulation['match'] = {
				_id: data.student._id
			};		
		}
		
		if (data.institution && data.institution._id) {
			institutionPopulation['match'] = {
				_id: data.institution._id
			};		
		}
		
		//Add data filter for dates
		if (data.institution && data.institution._id) {
			institutionPopulation['match'] = {
				age: { $gte: 21 }	
			};		
		}
		
		newOptions.population = [{
			path: 'studyPeriod',
			populate: {
				path: 'coe', 
				model: CoeModel,
				populate: [studentPopulation, institutionPopulation]
				}
		},
		{
			path: 'paymentType'
		}];
		
		const dateRestrictions = {$lte: new Date()};
		
		if (data.startDate) {
			const sDate = new Date(data.startDate.toString());
			dateRestrictions['$gte'] = sDate ;
		} 
		
		if (data.endDate) {
			const eDate = new Date(data.endDate.toString());
			dateRestrictions['$lte'] = eDate ;
		}
		
		newOptions.complexSearch = {
			$and: [
				{ $or: [{ receivedValue: null}, { $where: 'this.receivedValue < this.expectedValue' }] },
				{ expectedDate: dateRestrictions }
			]
		};
		
		return new Promise<string>((resolve: Function, reject: Function) => {
			this.find(data.payment, newOptions)
			.then((results: Payment[]) => {
				resolve(xlsxService.printPayments(results));
			})
			.catch((err: Error) => {
				reject(err);
			});	
		});
	}
}

export const paymentService = new PaymentService();
