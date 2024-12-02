import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IOfflineStore } from "../../types/iofflinestore";
import Cookies from "js-cookie";
import { getOfflineStoreList } from "../../apis/offlinestore/offlineStoreAPI";

function OfflineManagementComponent() {
    const [stores, setStores] = useState<IOfflineStore[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [creatorId, setCreatorId] = useState<string | null>(null);
    const navigate = useNavigate();

    // 쿠키에서 creatorId 가져오기
    useEffect(() => {
        const cookieCreatorLogin = Cookies.get("creatorlogin");
        if (!cookieCreatorLogin) {
            alert("creatorId 쿠키가 없습니다. 접근이 제한됩니다.");
            throw new Error("쿠키에서 creatorId를 가져올 수 없습니다.");
        }

        try {
            const parsedCookie = JSON.parse(cookieCreatorLogin); // 쿠키 데이터를 JSON으로 변환
            if (parsedCookie.creatorId) {
                setCreatorId(parsedCookie.creatorId);
            } else {
                throw new Error("쿠키에서 creatorId가 없습니다.");
            }
        } catch (error) {
            console.error("쿠키 파싱 중 오류 발생:", error);
            alert("쿠키 데이터를 확인할 수 없습니다.");
        }
    }, []);

    // 매장 리스트 가져오기
    useEffect(() => {
        const fetchStores = async () => {
            if (!creatorId) return; // creatorId가 없으면 실행하지 않음
            setLoading(true);
            try {
                const data = await getOfflineStoreList(creatorId); // API 호출
                setStores(data);
            } catch (err) {
                console.error("매장을 불러오는 데 실패했습니다:", err);
                setError("매장을 불러오는 데 실패했습니다. 다시 시도해주세요.");
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, [creatorId]);

    const goToEdit = (storeNo: number) => {
        navigate(`/offlinestore/edit/${storeNo}`, { state: { creatorId } });
    };


    const goToRegister = () => {
        navigate("/offlinestore/add"); // 매장 등록 페이지로 이동
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">오프라인 매장 관리</h1>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={goToRegister}
                >
                    매장 등록하기
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stores.map((store) => (
                    <div
                        key={store.storeNo}
                        className="border rounded p-4 shadow cursor-pointer"
                        onClick={() => goToEdit(store.storeNo)} // 수정 화면으로 이동
                    >
                        <img
                            src={store.storeImage || "default-image-path.jpg"}
                            alt={store.storeName}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h2 className="text-xl font-bold">{store.storeName}</h2>
                        <p>{store.storeAddress}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OfflineManagementComponent;
