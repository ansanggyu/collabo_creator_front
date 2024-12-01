export interface ICreatorlogin {
    creatorId: string;
    creatorPassword: string;
    accessToken: string;
    refreshToken: string;
    creatorName: string;
}

export interface ISigninParam {
    creatorId: string;
    creatorPassword: string;
}

export interface IErrorResponse {
    status: number;
    message: string;
}