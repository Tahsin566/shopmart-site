import * as express from 'express'
import { Document ,Types} from 'mongoose';
import { UserModelType, UserSchemaType } from './models/user.model';
import { MongooseType, userType } from './server-side-types/mongooseType';


declare global {
	namespace Express {
	  export interface Request  {
		user: UserModelType & Document
	  }
	}
  }