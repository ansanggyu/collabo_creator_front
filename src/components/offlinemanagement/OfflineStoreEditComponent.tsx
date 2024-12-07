import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { updateOfflineStore, getOfflineStoreList, deleteOfflineStore } from "../../apis/offlinestore/offlineStoreAPI";
import { uploadS3Images } from "../../apis/image/imageUploadAPI.ts";
import { useDaumPostcodePopup } from "react-daum-postcode";

function OfflineStoreEditComponent() {
    const navigate = useNavigate();
    const { storeNo } = useParams<{ storeNo: string }>();
    const open = useDaumPostcodePopup("https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const [storeName, setStoreName] = useState("");
    const [storeAddress, setStoreAddress] = useState("");
    const [storeAddressDetail, setStoreAddressDetail] = useState("");
    const [storeZipcode, setStoreZipcode] = useState("");
    const [storeImage, setStoreImage] = useState("");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStoreData = async () => {
            if (!storeNo) {
                alert("유효하지 않은 요청입니다.");
                navigate("/offlinestore");
                return;
            }

            const cookieCreatorLogin = Cookies.get("creatorlogin");
            const creatorId = cookieCreatorLogin ? JSON.parse(cookieCreatorLogin).creatorId : null;

            if (!creatorId) {
                alert("로그인이 필요합니다.");
                navigate("/login");
                return;
            }

            try {
                const stores = await getOfflineStoreList(creatorId);
                const store = stores.find((s) => s.storeNo === Number(storeNo));
                if (store) {
                    setStoreName(store.storeName || "");
                    setStoreAddress(store.storeAddress || "");
                    setStoreAddressDetail(""); // 상세 주소 초기화
                    setStoreZipcode(""); // 우편번호 초기화
                    setStoreImage(store.storeImage || "");
                } else {
                    alert("해당 매장을 찾을 수 없습니다.");
                    navigate("/offlinestore");
                }
            } catch (error: any) {
                console.error("Error fetching store data:", error.message);
                alert("매장 정보를 불러오는 데 실패했습니다.");
                navigate("/offlinestore");
            } finally {
                setLoading(false); // 반드시 상태 업데이트
            }
        };

        fetchStoreData();
    }, [storeNo, navigate]);

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

        if (!storeNo) {
            alert("유효하지 않은 매장입니다.");
            return;
        }

        try {
            let uploadedImageUrl = storeImage;
            if (imageFiles.length > 0) {
                // 이미지 업로드
                const uploadedImages = await uploadS3Images(imageFiles);
                uploadedImageUrl = uploadedImages[0]; // 새로 업로드된 이미지로 교체
            }

            const updatedStore = {
                storeName,
                storeAddress,
                storeAddressDetail,
                storeZipcode,
                storeImage: uploadedImageUrl,
            };

            await updateOfflineStore(Number(storeNo), updatedStore);
            alert("매장이 성공적으로 수정되었습니다.");
            navigate("/offlinestore");
        } catch (error: any) {
            console.error("Failed to update offline store:", error.message);
            alert("매장 수정에 실패했습니다.");
        }
    };

    const handleDelete = async () => {
        if (!storeNo) {
            alert("유효하지 않은 매장입니다.");
            return;
        }

        if (window.confirm("정말로 이 매장을 삭제하시겠습니까?")) {
            try {
                await deleteOfflineStore(Number(storeNo));
                alert("매장이 성공적으로 삭제되었습니다.");
                navigate("/offlinestore");
            } catch (error: any) {
                console.error("Failed to delete offline store:", error.message);
                alert("매장 삭제에 실패했습니다.");
            }
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">오프라인 매장 수정</h1>
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
                    />
                    {storeImage && (
                        <div className="mt-2">
                            <img
                                src={storeImage}
                                alt="현재 매장 이미지"
                                className="w-full h-32 object-cover rounded"
                            />
                        </div>
                    )}
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        수정하기
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        삭제하기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OfflineStoreEditComponent;
