import { useParams, useNavigate } from "react-router-dom";

const mockProductDetail = {
    id: 1,
    name: "스마트폰",
    description: "최신형 스마트폰으로 강력한 성능과 세련된 디자인을 자랑합니다.",
    price: 1000000,
    stock: 50,
    imageUrl: "https://via.placeholder.com/400",
    category: "전자제품",
    status: "판매중",
};

function ProductDetailComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = mockProductDetail;

    const handleEdit = () => {
        navigate(`/product/detail/modify/${id}`);
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* 상세 정보 헤더 */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    상품 상세 정보 - #{id}
                </h1>
                <p className="text-sm text-gray-600">
                    상품 정보를 확인하고 수정할 수 있습니다.
                </p>
            </div>

            {/* 상세 정보 컨테이너 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 상품 이미지 */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-2 text-center text-sm text-gray-600">
                        상품 이미지
                    </div>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-60 object-cover"
                    />
                </div>

                {/* 상품 정보 */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* 상품명 */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">상품명</p>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {product.name}
                            </h2>
                        </div>

                        {/* 상품 가격 */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">상품 가격</p>
                            <p className="text-lg font-bold text-gray-800">
                                {product.price.toLocaleString()}원
                            </p>
                        </div>

                        {/* 카테고리 */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">카테고리</p>
                            <p className="text-lg font-bold text-gray-800">
                                {product.category}
                            </p>
                        </div>

                        {/* 판매 상태 */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">판매 상태</p>
                            <p
                                className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                                    product.status === "판매중"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {product.status}
                            </p>
                        </div>

                        {/* 재고 수량 */}
                        <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
                            <p className="text-sm text-gray-600 mb-1">재고 수량</p>
                            <p className="text-lg font-bold text-gray-800">
                                {product.stock > 0 ? `${product.stock}개` : "품절"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상품 설명과 리뷰 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* 상품 설명 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        상품 설명
                    </h2>
                    <p className="text-sm text-gray-700">{product.description}</p>
                </div>

                {/* 고객 리뷰 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        고객 리뷰
                    </h2>
                    <p className="text-sm text-gray-600">
                        리뷰 데이터는 여기에 표시됩니다. (예: 4.5점 / 5.0점)
                    </p>
                </div>
            </div>

            {/* 수정하기 버튼 */}
            <div className="text-right mt-4">
                <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                >
                    수정하기
                </button>
            </div>
        </div>
    );
}

export default ProductDetailComponent;
