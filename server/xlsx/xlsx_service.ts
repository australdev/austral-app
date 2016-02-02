import {Payment, ModelOptions} from '../../client/core/dto';
import {ObjectUtil} from '../../client/core/util';
import {Workbook} from './workbook';
import * as XLSX from 'xlsx';

export class XlsxService {

	constructor() {
		
	}
	
	printPayments(data: Payment[]): any {
		
		const wb = new Workbook();
		const ws = this.getSheetFromPayments(data);
		
		/* add worksheet to workbook */
		const ws_name = "students";
		wb.SheetNames.push(ws_name);
		wb.Sheets[ws_name] = ws;
		
		/* write file */
		const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});
		return wbout;	
	}
	
	datenum(value: Date, date1904?: any) {
		const dateToString = value.getFullYear() + "/" + (value.getMonth() + 1) + "/" + (value.getDate() + 1);
		let epoch: number = Date.parse(dateToString);
		if (date1904) {
			epoch += 1462;
		};
		return (epoch - Date.UTC(1899, 11, 30)) / (24 * 60 * 60 * 1000);
	}
	
	
	getSheetFromPayments(data: Payment[], opts: any = {}) {
	const ws = {};
	// The number of colums will be 
	const COLUMNS = [
		{title: 'Institution', att: ['studyPeriod', 'coe', 'institution', 'name']},
		{title: 'Student', att: ['studyPeriod', 'coe', 'student', 'name']},
		{title: 'Course Fee', att: ['coursePayment']},
		{title: 'Commission (%)', att: ['commPerc']},
		{title: 'Gts', att: ['paymentGts']},
		{title: 'Expected Commission', att: ['expectedComm']},
		{title: 'Expected Value', att: ['expectedValue']},
		{title: 'Due To', att: ['expectedDate']},
		{title: 'Received Value', att: ['receivedValue']}
	];
	
	const range = {s: {c: COLUMNS.length, r: 10000000}, e: {c: 0, r: 0 }};
	for (let R = 0; R !== (data.length + 1); ++R) {
		const paymentRow = R > 0 ? (R - 1) : R;
		const payment = data[paymentRow];
		for (let C = 0; C !== COLUMNS.length; ++C) {
			if (range.s.r > R) {
				range.s.r = R;
			}
			if (range.s.c > C) {
				range.s.c = C;
			}
			if (range.e.r < R) {
				range.e.r = R;
			}
			if (range.e.c < C) {
				range.e.c = C;
			}

			let currentValue: any;
			
			if (R === 0) {
				currentValue = COLUMNS[C].title;
			} else {
				currentValue = ObjectUtil.clone(payment);
				for (let value in COLUMNS[C].att) {
					const prop = COLUMNS[C].att[value];
					if (ObjectUtil.isPresent(prop)) {
						if (ObjectUtil.isPresent(currentValue[prop])) {
							currentValue = ObjectUtil.clone(currentValue[prop]);	
						} else {
							currentValue = null;
						}
					} else {
						break;
					}
				}
			}
			
			if (ObjectUtil.isBlank(currentValue)) {
				continue;
			}
			
			const cell = {};
			//To Do, fix date recognition in excel
			if (COLUMNS[C].title === 'Due To' && R !== 0) {
				const thisDate = new Date(currentValue.toString());
				cell['v'] = thisDate;
			} else {
				cell['v'] = currentValue;
			}
			
			const cell_ref = XLSX.utils.encode_cell( {c: C, r: R});
			
			if (typeof cell['v'] === 'number') { 
				cell['t'] = 'n';
			} else if (typeof cell['v'] === 'boolean') {
				cell['t'] = 'b';
			} else if (cell['v'] instanceof Date) {
				cell['t'] = 'n';
				cell['z'] = XLSX.SSF._table[14];
				cell['s'] = { numFmt: "m/dd/yy"};
				cell['v'] = this.datenum(cell['v']);
			} else {
				cell['t'] = 's';
			}
			
			ws[cell_ref] = cell;
			}
		}
		if (range.s.c < 10000000) {
			ws['!ref'] = XLSX.utils.encode_range(range);
		}
		return ws;
	}
}

export const xlsxService = new XlsxService();


