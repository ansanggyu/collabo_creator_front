import { ISigninParam } from "../../types/icreatorlogin.ts";
import { ChangeEvent, useEffect, useState } from "react";
import useSignin from "../../hooks/useSignin.ts";
import { useLocation, useNavigate } from "react-router-dom";

const initialState: ISigninParam = {
    creatorId: '',
    creatorPassword: ''
}

function SigninComponent() {
    const [param, setParam] = useState(initialState);
    const { doSignin } = useSignin();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [rememberId, setRememberId] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const savedId = localStorage.getItem("rememberedcreatorId");
        if (savedId) {
            setParam((prev) => ({ ...prev, creatorId: savedId }));
            setRememberId(true); // 저장된 ID가 있으면 체크박스를 선택 상태로 유지
        }

        const searchParams = new URLSearchParams(location.search);
        const errorType = searchParams.get("error");

        if (errorType === "all" && !errorMessage) {
            setErrorMessage("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
        } else if (errorType === "incorrect" && !errorMessage) {
            setErrorMessage("아이디나 패스워드가 틀립니다. 다시 로그인 해주세요.");
        }
    }, [location.search, errorMessage]); // errorMessage가 변경될 때만 실행되도록 설정

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setParam((prev) => ({ ...prev, [name]: value }));
    };

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            console.log("로그인 요청 데이터:", param);

            // `doSignin` 호출 및 Thunk 응답 확인
            const response = await doSignin(param);

            console.log("doSignin Thunk Response:", response);

            // "아이디 저장"이 선택되었으면 로컬 스토리지에 creatorId 저장
            if (rememberId) {
                localStorage.setItem("rememberedcreatorId", param.creatorId);
            } else {
                localStorage.removeItem("rememberedcreatorId"); // 체크 해제 시 로컬 스토리지에서 삭제
            }

            // 로그인 성공 후, 메인 페이지로 리디렉션
            navigate("/main");
        } catch (exception: any) {
            // 로그인 실패 시 error 처리
            console.error("로그인 실패:", exception.response?.data?.message || exception.message);
        }
    };

    const toggleRememberId = () => {
        setRememberId((prev) => !prev);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <img className="w-28" src="/src/assets/img/logo.png" />
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden p-8">
                <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">관리자 로그인</h1>

                {errorMessage && (
                    <div className="text-red-500 text-center mb-6">
                        {errorMessage}
                    </div>
                )}

                <form>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="creatorId"
                            className="w-full border-2 border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 shadow-md"
                            placeholder="아이디"
                            value={param.creatorId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-8">
                        <input
                            type="password"
                            name="creatorPassword"
                            className="w-full border-2 border-gray-300 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 shadow-md"
                            placeholder="패스워드"
                            value={param.creatorPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={rememberId}
                                onChange={toggleRememberId}
                                className="text-blue-500"
                            />
                            <label className="text-gray-700">아이디 저장</label>
                        </div>
                    </div>

                    <button
                        onClick={handleClick}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SigninComponent;
