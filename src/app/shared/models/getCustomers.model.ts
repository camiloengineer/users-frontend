import { IUser } from "./user.model";

export interface IGetCustomersResponse {
    codigoError: string;
    user: IUser[];
}