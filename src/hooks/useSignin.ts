import {useAppDispatch, useAppSelector} from "./rtk.ts";
import {postSigninThunk, signout} from "../slices/signinSlice.ts";
import {Cookies} from "react-cookie";
import {ISigninParam} from "../types/icreatorlogin.ts";

const cookies = new Cookies();

const loadCookie = () => {

    const creatorloginCookie = cookies.get("creatorlogin");

    return creatorloginCookie
}


const useSignin = () => {

    const dispatch = useAppDispatch()
    let creatorlogin = useAppSelector(state => state.signin)

    if(!creatorlogin.creatorId){
        creatorlogin = loadCookie()
    }

    const doSignin = async (param: ISigninParam) => {
        try {
            const data = await dispatch(postSigninThunk(param)).unwrap();
            console.log("unwrap", data);
            cookies.set("creatorlogin", data, { path: "/" });
        } catch (error: any) {
            console.error("useSignin.ts failed:", error);
            throw error; // 예외를 상위 컴포넌트로 전달
        }
    }

    const doSignout = () => {
        dispatch(signout())
        cookies.remove("creatorlogin", {path:"/"})
    }

    return {creatorlogin, doSignin, doSignout}
}


export default useSignin