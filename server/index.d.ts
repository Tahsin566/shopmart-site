import * as express from 'express'
import { Document ,Types} from 'mongoose';
import { UserSchemaType } from './models/user.model';
import { MongooseType, userType } from './server-side-types/mongooseType';


declare global {
	namespace Express {
	  export interface Request  {
		user:MongooseType & {cartItems:Types.DocumentArray<{
			quantity: number;
			product?: Types.ObjectId | null | undefined;
		}, Types.Subdocument<Types.ObjectId, any, {
			quantity: number;
			product?: Types.ObjectId | null | undefined;
		}> & {
			quantity: number;
			product?: Types.ObjectId | null | undefined;
		}>}
	  }
	}
  }