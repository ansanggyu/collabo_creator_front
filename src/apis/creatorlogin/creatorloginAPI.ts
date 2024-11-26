import {IAdminlogin, ISigninParam} from "../../types/icreatorlogin.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = 'http://10.10.10.177:8080/api/adminlogin'

export const postSignin = async (param: ISigninParam): Promise<IAdminlogin> => {
    try {
        const result = await jwtAxios.post(
            `${host}/makeToken`,
            JSON.stringify(param), // 요청 본문을 명시적으로 JSON 문자열로 보내기
            {
                headers: {
                    'Content-Type': 'application/json' // JSON 데이터임을 명시
                }
            }
        );
        return result.data;
    } catch (exception: any) {
        //console.error(exception.response.data.message); // 에러 로그 추가
        window.location.href = "/login?error=incorrect"
        throw exception;
    }
}

export const refreshRequest = async (accessToken: string, refreshToken: string): Promise<IAdminlogin> => {

    const params = new URLSearchParams();
    params.append('refreshToken', refreshToken);

    const result = await jwtAxios.post(
        `${host}/refreshToken`, params,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );

    return result.data;
}