export const BACK_END_ROUTE = '/api';

export interface BaseDto {
  _id?: any;
  createdBy?: any;
  createdAt?: number;
  updatedAt?: number;
}

export interface Notification {
  type: string;
  data?: any;
}

export interface AuthorizationEvaluationResponse {
  authorized: boolean;
  msg?: string;
}

export interface AuthorizationData {
  user?: User;
}

export interface SignUp extends BaseDto {
  user?: User;
}

export interface User extends BaseDto {
  email?: string;
  password?: string;
  name?: string;
  userName?: string;
  locale?: string;
  picture?: string;
  countryCode?: string; 
  timezone?: number;
  gender?: string; 
  verified?: number; 
  status?: number;
  lastLoginDate?: Date; 
}

export interface LogIn extends BaseDto {
  username?: string;
  password?: string;
}

export interface AuthenticationResponse {
  token?: any;
  init?: any;
}

export interface ModelOptions {
  additionalData?: any;
  complexSearch?: any;
  population?: any;
  projection?: any;
  regularExpresion?: boolean;
  distinct?: any;
  authorization?: AuthorizationData;
  requireAuthorization?: boolean;
  copyAuthorizationData?: boolean;
  copyOptionalAuthorizationData?: boolean;
  specialAuthorizationDataSearch?: boolean;
}

export interface Client extends BaseDto {
  email?: string;
  name?: string;
  phone?: string;
}

export interface School extends BaseDto {
  name?: string;
  websiteUrl?: string;
}

export interface AquiredProgram extends BaseDto {
  name?: string;
  idProgramClient?: string;
  startingDate?: Date;
  endingDate?: Date;
  courseCost?: number;
  otherCost?: number;
  totalCost?: number;
  numberWeeks?: number;
  percentageComm?: number;
  period?: any;
  client?: any;
  school?: any;
}

export interface Payment extends BaseDto {
  expectedDate?: Date;
  expectedValue?: number;
  paidValue?: number;
  paymentType?: any;
  aquiredProgram?: any;
}

export interface Frequency extends BaseDto {
  name?: string;
  code?: string;
  valueInMonths?: string;
}

export interface PaymentType extends BaseDto {
  name?: string;
  code?: string;
}

