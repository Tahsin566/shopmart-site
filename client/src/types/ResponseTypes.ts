import {User} from "./userTypes"

export type Responsetype = {
    message:string,
    userinfo:User,
    user:User & {_id:string}
    error:string
}
