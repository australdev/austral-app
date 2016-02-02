import {Payment, PaymentSearch, ModelOptions} from '../../client/core/dto';
import {PaymentModel, CoeModel, StudentModel, InstitutionModel} from '../core/model';
import {BaseService} from '../core/base_service';
import {ObjectUtil} from '../../client/core/util';
import {coeService} from '../coe/coe_service';
import {studyPeriodService} from '../study_period/study_period_service';

export class PaymentService extends BaseService<Payment> {

	constructor() {
		const defaultModelOptions: ModelOptions = {
			population: 'studyPeriod paymentType'
		};
		super(PaymentModel, defaultModelOptions);
	}

	downloadData(data: PaymentSearch, newOptions: ModelOptions = {}): Promise<Payment[]> {

		
		const studentPopulation = {
			path: 'student', 
			model: StudentModel,
			select: 'name'
		};
		
		const institutionPopulation = {
			path: 'institution', 
			model: InstitutionModel,
			select: 'name'
		};
		
		newOptions.population = [{
			path: 'studyPeriod',
			select: 'coe',
			populate: {
				path: 'coe', 
				model: CoeModel,
				select: 'student institution',
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

		
		newOptions.additionalData = {
				 $or: [{ receivedValue: null}, { $where: 'this.receivedValue < this.expectedValue' }],
				 expectedDate: dateRestrictions
		};
		
		return new Promise<Payment[]>((resolve: Function, reject: Function) => {
			
			const modelOptions: ModelOptions = {
				authorization: newOptions.authorization,
				population: 'coe',
				distinct: '_id',
				additionalData: {}
			};
			
			// Add search filters
			if (data.student && data.student._id) {
				console.log("add student filter");
				ObjectUtil.merge(modelOptions.additionalData, { 'coe.student': data.student._id }); 
			}
			
			if (data.institution && data.institution._id) {
				console.log("add institution filter");
				ObjectUtil.merge(modelOptions.additionalData, { 'coe.institution': data.institution._id });
			}
			
			studyPeriodService.findDistinct({}, modelOptions).then((results: String[]) => {
				console.log("results " + JSON.stringify(results));
				if (results.length > 0) {
					ObjectUtil.merge(newOptions.additionalData, { 'studyPeriod._id': { $in: results } });
				}
				
				this.find(data.payment, newOptions)
				.then((results: Payment[]) => {
					resolve(results);
				}).catch((err: Error) => {
					reject(err);
					return;
				});
			})	
			.catch((err: Error) => {
				reject(err);
				return;
			});	
		});
	}
}

export const paymentService = new PaymentService();
