import { useParams, useNavigate } from "react-router-dom";

const mockProductDetail = {
    id: 1,
    name: "스마트폰",
    description: "최신형 스마트폰입니다.",
    price: 1000000,
    stock: 50,
    imageUrl: "/images/smartphone.jpg",
};

function ProductDetailComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = mockProductDetail; // 실제 데이터 연동 시 API 호출 필요

    const handleEdit = () => {
        navigate(`/product/detail/${id}/modify`);
    };

    return (
        <div className="product-detail">
            <h1 className="text-xl font-bold mb-4">상품 상세 정보 - #{id}</h1>
            <div className="flex">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-1/3 h-auto rounded shadow"
                />
                <div className="ml-4">
                    <p><strong>상품명:</strong> {product.name}</p>
                    <p><strong>가격:</strong> {product.price.toLocaleString()}원</p>
                    <p><strong>재고:</strong> {product.stock}개</p>
                    <p><strong>설명:</strong> {product.description}</p>
                    <button
                        onClick={handleEdit}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                        수정하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailComponent;
