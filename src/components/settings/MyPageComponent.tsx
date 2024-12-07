import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPage, updateMyPage } from "../../apis/mypage/myPageAPI";
import { ICreator } from "../../types/icreator";
import Cookies from "js-cookie";
import {uploadS3Images} from "../../apis/image/imageUploadAPI.ts";

function MyPageComponent() {
    const [creatorData, setCreatorData] = useState<ICreator | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const creatorId = Cookies.get("creatorlogin") ? JSON.parse(Cookies.get("creatorlogin")!).creatorId : null;

    // 데이터 로드
    useEffect(() => {
        if (!creatorId) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getMyPage(creatorId);
                setCreatorData(data);
            } catch (error: any) {
                console.error("Failed to fetch MyPage data:", error.message);
                alert("마이페이지 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [creatorId, navigate]);

    // 데이터 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setCreatorData((prev) =>
            prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : null
        );
    };

    // 이미지 업로드 핸들러
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ICreator) => {
        if (!e.target.files || e.target.files.length === 0) return;

        try {
            const uploadedUrls = await uploadS3Images(Array.from(e.target.files));
            if (uploadedUrls.length > 0) {
                setCreatorData((prev) => prev ? { ...prev, [fieldName]: uploadedUrls[0] } : null);
            }
        } catch (error: any) {
            console.error("Failed to upload image:", error.message);
            alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 데이터 저장
    const handleSave = async () => {
        if (!creatorId || !creatorData) return;

        try {
            await updateMyPage(creatorId, creatorData);
            alert("모든 정보가 성공적으로 저장되었습니다.");
        } catch (error: any) {
            console.error("Failed to update MyPage data:", error.message);
            alert("마이페이지 수정에 실패했습니다.");
        }
    };

    if (loading) return <div>로딩 중...</div>;

    if (!creatorData) return <div>데이터를 불러오지 못했습니다.</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 text-center">내 정보 관리</h1>

            {/* 프로필 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">프로필 관리</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                        <input
                            type="text"
                            name="creatorName"
                            value={creatorData.creatorName}
                            onChange={handleChange}
                            placeholder="이름을 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                        <input
                            type="email"
                            name="creatorEmail"
                            value={creatorData.creatorEmail}
                            onChange={handleChange}
                            placeholder="이메일 주소를 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                        <input
                            type="text"
                            name="creatorPhone"
                            value={creatorData.creatorPhone}
                            onChange={handleChange}
                            placeholder="전화번호를 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* 정산 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">정산 정보 관리</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">은행명</label>
                        <input
                            type="text"
                            name="creatorBank"
                            value={creatorData.creatorBank}
                            onChange={handleChange}
                            placeholder="은행명을 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">계좌번호</label>
                        <input
                            type="text"
                            name="creatorAccount"
                            value={creatorData.creatorAccount}
                            onChange={handleChange}
                            placeholder="계좌번호를 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* 개인 설정 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">개인 설정</h2>
                <div className="flex flex-col space-y-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={creatorData.emailNotifications}
                            onChange={handleChange}
                            className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-3 text-gray-700">이메일 알림 받기</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="smsNotifications"
                            checked={creatorData.smsNotifications}
                            onChange={handleChange}
                            className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-3 text-gray-700">SMS 알림 받기</span>
                    </label>
                </div>
            </div>

            {/* 배경 이미지 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">배경 이미지 관리</h2>
                <div className="flex flex-col space-y-4">
                    <label className="block">
                        <span className="text-sm text-gray-700">배경 이미지 업로드</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "backgroundImg")}
                            className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </label>
                    {creatorData.backgroundImg && (
                        <img src={creatorData.backgroundImg} alt="Background" className="mt-4 w-full h-auto rounded-lg" />
                    )}
                </div>
            </div>

            {/* 로고 이미지 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">로고 이미지 관리</h2>
                <div className="flex flex-col space-y-4">
                    <label className="block">
                        <span className="text-sm text-gray-700">로고 이미지 업로드</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "logoImg")}
                            className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </label>
                    {creatorData.logoImg && (
                        <img src={creatorData.logoImg} alt="Logo" className="mt-4 w-24 h-24 rounded-full" />
                    )}
                </div>
            </div>

            {/* 저장 버튼 */}
            <div className="text-center">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    저장
                </button>
            </div>
        </div>
    );
}

export default MyPageComponent;
