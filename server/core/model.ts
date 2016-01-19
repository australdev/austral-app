import {Schema, Document, createConnection} from 'mongoose';
import * as bcrypt from 'bcrypt';

import {ObjectUtil} from '../../client/core/util';
import {DatabaseObjectUtil} from './db_util';

/* tslint:disable */
const ObjectId = Schema.Types.ObjectId;
/* tslint:enable */
const SALT = 10;

const db = createConnection(process.env.AUSTRAL_MONGO_URI);
db.on('error', () => console.error('Error connecting to Database:', process.env.AUSTRAL_MONGO_URI));
db.once('open', () => console.log('%s: Connected to MongoDb on %s', new Date(), process.env.AUSTRAL_MONGO_URI));


const schemas = {
  user: new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    userName: { type: String, required: true },
    locale: { type: String },
    picture: { type: String },
    countryCode: { type: String },
    timezone: { type: Number },
    gender: { type: String },
    verified: { type: Number },
    status: { type: Number, default: 1, index: true, required: true },
    lastLoginDate: { type: Date },
    createdBy: { type: ObjectId, ref: 'user' },
    createdAt: { type: Number },
    updatedAt: { type: Number }
  }),
  coe: new Schema({
		student: { type: ObjectId, ref: 'student', required: true, index: true },
		institution: { type: ObjectId, ref: 'institution', required: true, index: true },
		courseType: { type: ObjectId, ref: 'courseType', required: true, index: true },
		courseCode: { type: String, required: true },
		courseName: { type: String, required: true },
		startDate: { type: Date, default: Date.now() },
		endDate: { type: Date, default: Date.now() },
		tuitionFee: { type: String, required: true },
		createdBy: { type: ObjectId, ref: 'user' },
		createdAt: { type: Number },
		updatedAt: { type: Number }
	}),
  frequency: new Schema({
		code: { type: String, required: true },
		description: { type: String, required: true },
		periodicity: { type: String, required: true },
		minPeriod: { type: String, required: true },
		createdBy: { type: ObjectId, ref: 'user' },
		createdAt: { type: Number },
		updatedAt: { type: Number }
	}),
	student: new Schema({
		institutionCode: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		createdBy: { type: ObjectId, ref: 'user' },
		createdAt: { type: Number },
		updatedAt: { type: Number }
	}),
	payment: new Schema({
		studyPeriod: { type: ObjectId, ref: 'studyPeriod', required: true, index: true },
		paymentType: { type: ObjectId, ref: 'paymentType', required: true, index: true },
		description: { type: String, required: true },
		expectedDate: { type: Date, default: Date.now() },
		expectedValue: { type: String, required: true },
		commPerc: { type: String, required: true },
		paymentGts: { type: String, required: true },
		frequency: { type: String, required: true },
		receivedDate: { type: Date, default: Date.now() },
		receivedValue: { type: String, required: true },
		createdBy: { type: ObjectId, ref: 'user' },
		createdAt: { type: Number },
		updatedAt: { type: Number }
	}),
	institution: new Schema({
		name: { type: String, required: true },
		code: { type: String, required: true },
		createdBy: { type: ObjectId, ref: 'user' },
		createdAt: { type: Number },
		updatedAt: { type: Number }
	}),
	paymentType: new Schema({
		code: { type: String, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		createdBy: { type: ObjectId, ref: 'user' },
		createdAt: { type: Number },
		updatedAt: { type: Number }
	}),
	studyPeriod: new Schema({
		coe: { type: ObjectId, ref: 'coe', required: true, index: true },
		description: { type: String, required: true },
		startDate: { type: Date, default: Date.now() },
		endDate: { type: Date, default: Date.now() },
		periodFee: { type: String, required: true },
		commPerc: { type: String, required: true },
		periodGts: { type: String, required: true },
		frequency: { type: ObjectId, ref: 'frequency', required: true },
		createdBy: { type: ObjectId, ref: 'user' },
		createdAt: { type: Number },
		updatedAt: { type: Number }
	}),
	courseType: new Schema({
		code: { type: String, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		createdBy: { type: ObjectId, ref: 'user' },
		createdAt: { type: Number },
		updatedAt: { type: Number }
	})
};


for (let prop in schemas) {
  const schem: Schema = schemas[prop];
  schem.pre('save', function(next: Function) {
    const obj: Document = this;
    const now = Date.now();
    if (obj.isNew) {
      obj['createdAt'] = now;
    }
    obj['updatedAt'] = now;
    next();
  });
}


export const UserModel = db.model('user', schemas.user);
export const CoeModel = db.model('coe', schemas.coe);
export const FrequencyModel = db.model('frequency', schemas.frequency);
export const StudentModel = db.model('student', schemas.student);
export const PaymentModel = db.model('payment', schemas.payment);
export const InstitutionModel = db.model('institution', schemas.institution);
export const PaymentTypeModel = db.model('paymentType', schemas.paymentType);
export const StudyPeriodModel = db.model('studyPeriod', schemas.studyPeriod);
export const CourseTypeModel = db.model('courseType', schemas.courseType);


schemas.user.pre('save', function (next: Function) {
  const obj = this;
  if (!obj.isModified('password')) {
    next();
  }
 
  bcrypt.hash(obj['password'], SALT, (err, hash) => {
      if (err) { 
        next(err);
      };
      
      obj['password'] = hash;
      next();
  });  
});