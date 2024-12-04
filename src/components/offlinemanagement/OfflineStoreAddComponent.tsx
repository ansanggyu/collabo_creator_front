import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { registerOfflineStore } from "../../apis/offlinestore/offlineStoreAPI.ts";
import { uploadS3Images } from "../../apis/image/imageUploadAPI.ts"; // 수정: 이미지 다중 업로드 API
import { useDaumPostcodePopup } from "react-daum-postcode";

function OfflineStoreAddComponent() {
    const navigate = useNavigate();
    const open = useDaumPostcodePopup("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const [storeName, setStoreName] = useState("");
    const [storeAddress, setStoreAddress] = useState("");
    const [storeAddressDetail, setStoreAddressDetail] = useState("");
    const [storeZipcode, setStoreZipcode] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const handleAddressSelect = (data: any) => {
        setStoreAddress(data.address);
        setStoreZipcode(data.zonecode);
    };

    const handleOpenPostcode = () => {
        open({ onComplete: handleAddressSelect });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles(Array.from(e.target.files));
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
            // 이미지 업로드
            const uploadedImageUrls = await uploadS3Images(imageFiles);

            // 오프라인 매장 등록
            const storeData = {
                storeName,
                storeAddress,
                storeAddressDetail,
                storeZipcode,
                storeImage: uploadedImageUrls[0],
            };

            const storeId = await registerOfflineStore(creatorId, storeData);
            alert(`오프라인 매장이 성공적으로 등록되었습니다. (ID: ${storeId})`);
            navigate("/offlinestore");
        } catch (error) {
            console.error("Failed to register offline store:", axios.isAxiosError(error);
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
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">매장 주소</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={storeZipcode}
                            placeholder="우편번호"
                            className="w-1/3 p-2 border rounded"
                            readOnly
                        />
                        <button
                            type="button"
                            onClick={handleOpenPostcode}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            주소 검색
                        </button>
                    </div>
                    <input
                        type="text"
                        value={storeAddress}
                        placeholder="주소"
                        className="w-full mt-2 p-2 border rounded"
                        readOnly
                    />
                    <input
                        type="text"
                        value={storeAddressDetail}
                        onChange={(e) => setStoreAddressDetail(e.target.value)}
                        placeholder="상세 주소"
                        className="w-full mt-2 p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">매장 이미지</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded"
                        accept="image/*"
                        multiple
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
