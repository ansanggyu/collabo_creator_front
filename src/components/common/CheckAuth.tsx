
//로그인이 안되어 있는데 로그인이 필요한 창이면 무조건 로그인창으로 튕기게 하기.
import useSignin from "../../hooks/useSignin.ts";
import {Navigate} from "react-router-dom";

function CheckAuth({children}: {children: React.ReactNode}) {

    const {creatorlogin} = useSignin()

    if(!creatorlogin){
        return <Navigate to={'/login'} replace={true}></Navigate>
    }

    return(
        <>
            {children}
        </>
    );
}

export default CheckAuth;