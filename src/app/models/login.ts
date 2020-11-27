import { Guid } from "guid-typescript";

export class LoginRequestView {
    name: string;
    password: string;
}

export class RolsView {
    rolsId: Guid;
    rolNameSystem: string;
    rolNameApplication: string;
}

export class AuthorizationView {
    authorizationId?: Guid;
    authorizationNameSystem: string;
    authorizationNameApplication: string;
}