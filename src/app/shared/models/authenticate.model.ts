import { IUser } from "./user.model";

export interface IAuthenticateRequest {
    dni: number;
    password: string;
}

export interface IAuthenticateResponse {
    codigoError: string;
    token: string;
    user: IUser;
}