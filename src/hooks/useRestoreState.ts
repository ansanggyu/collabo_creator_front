import { useEffect } from "react";
import { useAppDispatch } from "./rtk.ts";
import { signin } from "../slices/signinSlice.ts";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const useRestoreState = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const cookieData = cookies.get("creatorlogin");
        if (cookieData) {
            console.log("useRestoreState: 쿠키에서 상태 복원", cookieData);
            dispatch(signin(cookieData)); // Redux 상태 복원
        }
    }, [dispatch]);
};

export default useRestoreState;
