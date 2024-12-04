import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IOfflineStore } from "../../types/iofflinestore.ts";
import { registerOfflineStore } from "../../apis/offlinestore/offlineStoreAPI.ts";
import { uploadImages } from "../../apis/image/imageUploadAPI.ts"; // 수정: 이미지 다중 업로드 API

function OfflineStoreAddComponent() {
    const navigate = useNavigate();
    const [storeName, setStoreName] = useState("");
    const [storeAddress, setStoreAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]); // 파일 리스트로 관리

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            console.log("Selected files:", files); // 파일 리스트를 확인
            setImageFiles(Array.from(files)); // 선택된 파일들을 배열로 저장
        } else {
            console.error("No files selected");
        }
    };

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

        try {
            // 1. 이미지 업로드
            let uploadedImageUrls: string[] = [];
            if (imageFiles.length > 0) {
                uploadedImageUrls = await uploadImages(imageFiles); // 다중 이미지 업로드
            } else {
                alert("이미지를 업로드해주세요.");
                return;
            }

            // 2. 오프라인 매장 등록
            const storeData: Partial<IOfflineStore> = {
                storeName,
                storeAddress,
                latitude,
                longitude,
                storeImage: uploadedImageUrls[0], // 첫 번째 URL을 대표 이미지로 사용
            };

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
                    <label className="block text-gray-700 font-medium mb-2">매장명</label>
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
                    <label className="block text-gray-700 font-medium mb-2">매장 주소</label>
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
                    <label className="block text-gray-700 font-medium mb-2">위도 (Latitude)</label>
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
                    <label className="block text-gray-700 font-medium mb-2">경도 (Longitude)</label>
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
                    <label className="block text-gray-700 font-medium mb-2">매장 이미지</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded"
                        accept="image/*"
                        multiple // 다중 파일 선택 가능
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
