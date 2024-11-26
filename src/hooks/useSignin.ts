import {useAppDispatch, useAppSelector} from "./rtk.ts";
import {postSigninThunk, signout} from "../slices/signinSlice.ts";
import {Cookies} from "react-cookie";
import {ISigninParam} from "../types/icreatorlogin.ts";

const cookies = new Cookies();

const loadCookie = () => {

    const adminloginCookie = cookies.get("adminlogin");

    return adminloginCookie
}


const useSignin = () => {

    const dispatch = useAppDispatch()
    let creatorlogin = useAppSelector(state => state.signin)

    if(!creatorlogin.createrId){
        creatorlogin = loadCookie()
    }

    const doSignin = (param:ISigninParam) => {
        dispatch(postSigninThunk(param))
            .unwrap()
            .then( data => {
                console.log("unwrap")
                console.log(data)
                cookies.set("creatorlogin", data, {path:"/"})
            })
    }

    const doSignout = () => {
        dispatch(signout())
        cookies.remove("creatorlogin", {path:"/"})
    }

    return {creatorlogin, doSignin, doSignout}
}


export default useSignin