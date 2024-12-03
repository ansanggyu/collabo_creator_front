import {useAppSelector} from "../../hooks/rtk.ts";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import SigninComponent from "../../components/creatorlogin/SigninComponent.tsx";

function CreatorLoginPage() {
    const creatorlogin = useAppSelector((state) => state.signin); // 리덕스에서 adminlogin 상태 가져오기
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (creatorlogin.creatorId) {
            setIsRedirecting(true); // 로그인된 경우 리디렉션 플래그를 true로 설정
        }
    }, [creatorlogin]); // adminlogin 전체를 의존성 배열에 넣어 상태 변경을 감지

    if (isRedirecting) {
        return <Navigate to="/main" replace />; // 리디렉션 처리
    }

    return (
        <div className="justify-center h-full">
            <SigninComponent />
        </div>
    );
}

export default CreatorLoginPage;