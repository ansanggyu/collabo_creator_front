import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IOfflineStore } from "../../types/iofflinestore";
import { updateOfflineStore, getOfflineStoreList, deleteOfflineStore } from "../../apis/offlinestore/offlineStoreAPI";

function OfflineStoreEditComponent() {
    const navigate = useNavigate();
    const { storeNo } = useParams<{ storeNo: string }>();
    const location = useLocation();
    const creatorId = location.state?.creatorId || "";

    const [formData, setFormData] = useState<Partial<IOfflineStore>>({
        storeName: "",
        storeAddress: "",
        latitude: "",
        longitude: "",
        storeImage: "",
    });

    useEffect(() => {
        const fetchStoreData = async () => {
            if (!creatorId || !storeNo) return;

            try {
                const stores = await getOfflineStoreList(creatorId);
                const store = stores.find((s) => s.storeNo === Number(storeNo));
                if (store) {
                    setFormData(store);
                } else {
                    alert("해당 매장을 찾을 수 없습니다.");
                    navigate("/offlinestore");
                }
            } catch (error: any) {
                console.error("Failed to fetch store data:", error.message);
                alert("매장 정보를 불러오는 데 실패했습니다.");
                navigate("/offlinestore");
            }
        };

        fetchStoreData();
    }, [creatorId, storeNo, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!storeNo) {
            alert("유효하지 않은 매장입니다.");
            return;
        }

        try {
            await updateOfflineStore(Number(storeNo), formData);
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

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">오프라인 매장 수정</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        매장명
                    </label>
                    <input
                        type="text"
                        name="storeName"
                        value={formData.storeName || ""}
                        onChange={handleChange}
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
                        name="storeAddress"
                        value={formData.storeAddress || ""}
                        onChange={handleChange}
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
                        name="latitude"
                        value={formData.latitude || ""}
                        onChange={handleChange}
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
                        name="longitude"
                        value={formData.longitude || ""}
                        onChange={handleChange}
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
                        name="storeImage"
                        value={formData.storeImage || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="이미지 URL을 입력하세요"
                        required
                    />
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
