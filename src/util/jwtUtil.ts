import axios from "axios"; // 기본 axios 가져오기
import { Cookies } from "react-cookie"; // react-cookie 사용
import { refreshRequest } from "../apis/creatorlogin/creatorloginAPI.ts";

const cookies = new Cookies();
const jwtAxios = axios.create({}); // 기본 axios 인스턴스 생성

// 요청 보내기 전에 accessToken을 쿠키에서 꺼내서 헤더에 추가
const beforeReq = (config: any): any => { // config 타입을 any로 수정
    const creatorLoginCookie = cookies.get("creatorlogin");

    if (!creatorLoginCookie) {
        console.log("CreatorLogin Cookies are not found.");
        return config;
    }

    const accessToken = creatorLoginCookie.accessToken;

    if (accessToken) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
        };
    }

    return config;
};

const failReq = (error: unknown) => {
    console.log("fail request");
    return Promise.reject(error);
};

const beforeRes = async (res: any): Promise<any> => {
    console.log("beforeRes triggered: Checking access token status");
    return res;
};

const failRes = async (error: any) => {
    console.log("failRes triggered:", error);

    if (error.response?.data?.msg === "Access Token just Expired!!!") {
        console.log("Access token expired, attempting refresh.");

        const creatorLoginCookie = cookies.get("creatorlogin");

        if (!creatorLoginCookie) {
            console.error("creatorlogin cookie is missing!");
            return Promise.reject(error);
        }

        const { accessToken, refreshToken } = creatorLoginCookie;

        try {
            const refreshResult = await refreshRequest(accessToken, refreshToken);

            cookies.set(
                "creatorlogin",
                {
                    ...creatorLoginCookie,
                    accessToken: refreshResult.accessToken,
                    refreshToken: refreshResult.refreshToken,
                },
                { path: "/", maxAge: 60 * 60 * 24 * 7 }
            );

            const originalRequest = error.config;
            if (originalRequest) {
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${refreshResult.accessToken}`,
                };
                return await axios(originalRequest);
            }
        } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            cookies.remove("creatorlogin", { path: "/" });
            window.location.href = "/login?error=all";
            return Promise.reject(refreshError);
        }
    } else {
        console.error("Error in response:", error.response?.data?.msg);
        return Promise.reject(error);
    }
};

jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, failRes);

export default jwtAxios;
