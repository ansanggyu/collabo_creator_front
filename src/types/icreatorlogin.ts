export interface IAdminlogin {
    createrId: string;
    pw: string;
    accessToken: string;
    refreshToken: string;
    creatorName: string;
}

export interface ISigninParam {
    createrId: string;
    pw: string;
}

export interface IErrorResponse {
    status: number;
    message: string;
}