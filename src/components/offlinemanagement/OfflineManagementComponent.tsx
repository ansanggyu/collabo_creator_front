import storeImage1 from "../../assets/img/gangnam-store-image.jpg";
import storeImage2 from "../../assets/img/heaundea-store-image.jpg";
import { useNavigate } from "react-router-dom";

function OfflineManagementComponent() {
    const navigate = useNavigate();

    const stores = [
        {
            id: 1,
            name: "강남점",
            description: "서울 강남에 위치한 매장입니다.",
            imageUrl: storeImage1,
        },
        {
            id: 2,
            name: "부산점",
            description: "부산 해운대에 위치한 매장입니다.",
            imageUrl: storeImage2,
        },
    ];

    const goToDetail = (id: number) => {
        navigate(`/offlinestore/${id}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">오프라인 매장 소개</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stores.map((store) => (
                    <div
                        key={store.id}
                        className="border rounded p-4 shadow cursor-pointer"
                        onClick={() => goToDetail(store.id)}
                    >
                        <img
                            src={store.imageUrl}
                            alt={store.name}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h2 className="text-xl font-bold">{store.name}</h2>
                        <p>{store.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OfflineManagementComponent;
