import storeImage1 from "../../assets/img/gangnam-store-image.jpg";
import storeImage2 from "../../assets/img/heaundea-store-image.jpg";
import { useParams } from "react-router-dom";

function OfflineStoreDetailComponent() {
    const { id } = useParams();

    // 더미 데이터
    const storeDetails = {
        1: {
            name: "강남점",
            address: "서울 강남구 테헤란로 123",
            contact: "02-1234-5678",
            description: "서울 강남에 위치한 매장입니다. 최신 트렌드를 반영한 다양한 상품을 제공합니다.",
            openingHours: "월-금 09:00 - 20:00 / 주말 10:00 - 18:00",
            imageUrl: storeImage1,
        },
        2: {
            name: "부산점",
            address: "부산 해운대구 해운대로 456",
            contact: "051-9876-5432",
            description: "부산 해운대에 위치한 매장으로 지역 특산품도 함께 만나보실 수 있습니다.",
            openingHours: "월-일 10:00 - 21:00",
            imageUrl: storeImage2,
        },
    };

    const storeId = Number(id);

    const store = storeDetails[storeId as keyof typeof storeDetails];

    if (!store) {
        return <div>해당 매장 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{store.name}</h1>
            <div className="flex flex-col md:flex-row">
                <img
                    src={store.imageUrl}
                    alt={store.name}
                    className="w-full md:w-1/2 h-64 object-cover rounded mb-4 md:mb-0 md:mr-4"
                />
                <div className="flex-1">
                    <p className="text-lg mb-2"><strong>주소:</strong> {store.address}</p>
                    <p className="text-lg mb-2"><strong>연락처:</strong> {store.contact}</p>
                    <p className="text-lg mb-2"><strong>운영 시간:</strong> {store.openingHours}</p>
                    <p className="text-lg mb-4"><strong>설명:</strong> {store.description}</p>
                </div>
            </div>
        </div>
    );
}

export default OfflineStoreDetailComponent;
