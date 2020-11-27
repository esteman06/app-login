import { Guid } from 'guid-typescript';

export class IdentityUserView {
    identityUserId?: Guid;
    name: string;
    password: string;
    isActive: boolean;
    isTempPassword: boolean;
    token: string;
    rolsId: Guid;
    rolName: string;
    authEdit: boolean;
    authQuery: boolean;
    authCreate: boolean;
    authDelete: boolean;
}

export class InformationUserView {
    informationUserId?: Guid;
    identityUserId?: Guid;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    age: number;
    rolsId: Guid;
    password: string;
}
