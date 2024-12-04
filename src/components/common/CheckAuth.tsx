import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";

function CheckAuth({ children }: { children: React.ReactNode }) {
    // Redux에서 로그인 상태 가져오기
    const { accessToken } = useSelector((state: RootState) => state.signin);

    // 로그인 상태가 없으면 로그인 페이지로 리다이렉트
    if (!accessToken) {
        return <Navigate to="/login" replace={true} />;
    }

    return <>{children}</>;
}

export default CheckAuth;
