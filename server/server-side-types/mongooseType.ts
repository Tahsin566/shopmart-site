import { Document, FlattenMaps, Types } from "mongoose";
import { UserModelType } from "../models/user.model";

export type MongooseType = (Document<unknown, {}, UserModelType> & UserModelType ) | null 


export type userType = (FlattenMaps<UserModelType> & UserModelType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}) | null 