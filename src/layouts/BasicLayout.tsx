import React from "react";
import { useDispatch } from "react-redux";
import { signout } from "../slices/signinSlice";
import Cookies from "js-cookie";
import AsideMenuComponent from "../components/common/AsideMenuComponent.tsx";
import { useNavigate } from "react-router-dom";
import CheckAuth from "../components/common/CheckAuth.tsx";

function BasicLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // 상태 초기화
        dispatch(signout());

        // 쿠키 제거
        Cookies.remove("creatorlogin");

        // 로그아웃 후 로그인 페이지로 이동
        navigate("/login");
    };

    return (
        <CheckAuth>
            <div className={`flex h-screen bg-gray-50 max-w-[120rem] m-auto`}>
                {/* Desktop sidebar */}
                <AsideMenuComponent />

                <div className="flex flex-col flex-1 w-full">
                    {/* Header */}
                    <header className="z-10 py-4 bg-side-navy">
                        <div className="w-full flex justify-end px-6">
                            <button
                                onClick={handleLogout} // 로그아웃 핸들러 연결
                                className="px-6 py-2 text-white rounded-full bg-neutral-700 hover:bg-neutral-500 focus:outline-none hover:text-black focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="h-full overflow-y-auto">
                        <div className="container px-2 mx-auto grid m-1">{children}</div>
                    </main>
                </div>
            </div>
        </CheckAuth>
    );
}

export default BasicLayout;
