import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IOfflineStore } from "../../types/iofflinestore.ts";
import {registerOfflineStore} from "../../apis/offlinestore/offlineStoreAPI.ts";

function OfflineStoreAddComponent() {
    const navigate = useNavigate();
    const [storeName, setStoreName] = useState("");
    const [storeAddress, setStoreAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [storeImage, setStoreImage] = useState(""); // 이미지 URL로 대체

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cookieCreatorLogin = Cookies.get("creatorlogin");
        if (!cookieCreatorLogin) {
            alert("로그인이 필요합니다.");
            return;
        }

        const creatorId = JSON.parse(cookieCreatorLogin).creatorId;

        if (!creatorId) {
            alert("유효하지 않은 사용자입니다.");
            return;
        }

        const storeData: Partial<IOfflineStore> = {
            storeName,
            storeAddress,
            latitude,
            longitude,
            storeImage, // URL로 전달
        };

        try {
            const storeId = await registerOfflineStore(creatorId, storeData);
            alert(`오프라인 매장이 성공적으로 등록되었습니다. (ID: ${storeId})`);
            navigate("/offlinestore"); // 등록 후 매장 리스트 페이지로 이동
        } catch (error: any) {
            console.error("Failed to register offline store:", error.message);
            alert("오프라인 매장 등록에 실패했습니다.");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">오프라인 매장 등록</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        매장명
                    </label>
                    <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="매장명을 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        매장 주소
                    </label>
                    <input
                        type="text"
                        value={storeAddress}
                        onChange={(e) => setStoreAddress(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="매장 주소를 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        위도 (Latitude)
                    </label>
                    <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="위도를 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        경도 (Longitude)
                    </label>
                    <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="경도를 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        매장 이미지 URL
                    </label>
                    <input
                        type="text"
                        value={storeImage}
                        onChange={(e) => setStoreImage(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="이미지 URL을 입력하세요"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    등록하기
                </button>
            </form>
        </div>
    );
}

export default OfflineStoreAddComponent;
