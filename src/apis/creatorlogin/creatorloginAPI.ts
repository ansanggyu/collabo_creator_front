import {ICreatorlogin, ISigninParam} from "../../types/icreatorlogin.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = `${import.meta.env.VITE_HOST_IP}`+'/creatorlogin'

export const postSignin = async (param: ISigninParam): Promise<ICreatorlogin> => {
    try {
        const result = await jwtAxios.post<ICreatorlogin>(
            `${host}/makeToken`,
            JSON.stringify(param), // 요청 본문을 명시적으로 JSON 문자열로 보내기
            {
                headers: {
                    'Content-Type': 'application/json' // JSON 데이터임을 명시
                }
            }
        );
        console.log(host)
        return result.data;
    } catch (exception) {
        console.error("Signin API error:", exception);
        const errorMessage = exception || "An unknown error occurred.";
        console.error("Error message:", errorMessage);
        //window.location.href = "/login?error=incorrect";
        throw exception;
    }
}

export const refreshRequest = async (accessToken: string, refreshToken: string): Promise<ICreatorlogin> => {

    const params = new URLSearchParams();
    params.append('refreshToken', refreshToken);

    const result = await jwtAxios.post<ICreatorlogin>(
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