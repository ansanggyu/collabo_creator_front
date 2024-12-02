import { useAppDispatch, useAppSelector } from "./rtk.ts";
import { postSigninThunk, signin, signout } from "../slices/signinSlice.ts";
import { Cookies } from "react-cookie";
import { ISigninParam } from "../types/icreatorlogin.ts";

const cookies = new Cookies();

// const loadCookie = () => {
//     const creatorloginCookie = cookies.get("creatorlogin");
//     return creatorloginCookie;
// };

const useSignin = () => {
    const dispatch = useAppDispatch();
    const creatorlogin = useAppSelector((state) => state.signin);

    // // 상태가 비어 있을 경우 쿠키를 사용하여 상태 복원
    // if (!creatorlogin.creatorId) {
    //     const cookieData = loadCookie();
    //     if (cookieData) {
    //         console.log("쿠키에서 상태 복원: ", cookieData);
    //         dispatch(signin(cookieData)); // Redux 상태 복원
    //     }
    // }

    const doSignin = async (param: ISigninParam) => {
        try {
            console.log("doSignin 호출: ", param);
            const data = await dispatch(postSigninThunk(param)).unwrap();
            console.log("Thunk unwrap 결과: ", data);

            cookies.set("creatorlogin", data, { path: "/" });
            return data;
        } catch (error: any) {
            console.error("useSignin.ts failed:", error);
            throw error;
        }
    };

    const doSignout = () => {
        console.log("doSignout 호출");
        dispatch(signout());
        cookies.remove("creatorlogin", { path: "/" });
    };

    return { creatorlogin, doSignin, doSignout };
};

export default useSignin;
