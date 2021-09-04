import { IUser } from "./user.model";

export interface ICreateOrUpdateCustomerResponse {
    codigoError: string;
    user: IUser;
}