import { IUser } from "./user.model";

export interface IGetCustomerResponse {
    codigoError: string;
    user: IUser;
}