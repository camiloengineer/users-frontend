export interface IUser {
    guid?: string;
    name?: string;
    dni?: number;
    email?: string;
    phone?: number;
    birthdate?: Date;
    active?: boolean;
    password?: string;
    newPassword?: string;
    avatar?: string;
}