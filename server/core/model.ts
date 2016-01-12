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
  school: new Schema({
    name: { type: String, required: true, index: true, unique: true },
    websiteUrl: { type: String }
  }),
  client: new Schema({
    email: { type: String, required: true },
    phone: { type: String },
    name: { type: String, required: true }, 
    createdBy: { type: ObjectId, ref: 'user' },
    createdAt: { type: Number },
    updatedAt: { type: Number }
  }),
  aquiredProgram: new Schema({
    name: { type: String, required: true, unique: true },
    idProgramClient: { type: String },
    startingDate: { type: Date },
    endingDate: { type: Date },
    courseCost: { type: Number },
    otherCost: { type: Number }, //Other fees
    totalCost: { type: Number }, //Other fees + Cost
    numberWeeks: { type: Number },
    percentageComm: { type: Number }, //Percentage commision
    period: { type: ObjectId, ref: 'frequency' }, // monthly, trimester, semester, etc
    client: { type: ObjectId, ref: 'client' },
    school: { type: ObjectId, ref: 'school' },
    createdBy: { type: ObjectId, ref: 'user' },
    createdAt: { type: Number },
    updatedAt: { type: Number }  
  }),
  payment: new Schema({
    expectedDate: {type: Date, required: true},
    expectedValue: { type: Number, required: true},
    paidValue: {type: Number},
    paymentType: {type: ObjectId, required: true, ref: 'paymentType' }, //First payment, other payment
    aquiredProgram: { type: ObjectId, ref: 'aquiredProgram', required: true },
    createdBy: { type: ObjectId, ref: 'user' },
    createdAt: { type: Number },
    updatedAt: { type: Number }
  }),
  frequency: new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    valueInMonths: { type: Number, required: true },
    createdBy: { type: ObjectId, ref: 'user' },
    createdAt: { type: Number },
    updatedAt: { type: Number }
  }),
  paymentType: new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
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
export const SchoolModel = db.model('school', schemas.school);
export const ClientModel = db.model('client', schemas.client);
export const AquiredProgramModel = db.model('aquiredProgram', schemas.aquiredProgram);
export const PaymentModel = db.model('payment', schemas.payment);
export const PaymentTypeModel = db.model('paymentType', schemas.paymentType);
export const FrequencyModel = db.model('frequency', schemas.frequency);


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