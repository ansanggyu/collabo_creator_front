export interface ICreatorlogin {
    creatorId: string;
    pw: string;
    accessToken: string;
    refreshToken: string;
    creatorName: string;
}

export interface ISigninParam {
    creatorId: string;
    pw: string;
}

export interface IErrorResponse {
    status: number;
    message: string;
}