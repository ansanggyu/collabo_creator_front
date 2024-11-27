import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockProductDetail = {
    id: 1,
    name: "스마트폰",
    description: "최신형 스마트폰입니다.",
    price: 1000000,
    stock: 50,
    imageUrl: "https://via.placeholder.com/400",
    category: "전자제품",
    status: "판매중",
};

function ModifyProductComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(mockProductDetail);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("수정된 상품:", product);
        alert("상품 정보가 수정되었습니다.");
        navigate(`/product/detail/${id}`);
    };

    return (
        <form onSubmit={handleSave} className="p-4 bg-gray-50 min-h-screen">
            {/* 수정 화면 헤더 */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    상품 수정 - #{id}
                </h1>
                <p className="text-sm text-gray-600">상품 정보를 수정하고 저장하세요.</p>
            </div>

            {/* 수정 가능한 상세 정보 */}
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

                {/* 수정 가능한 상품 정보 */}
                <div className="grid grid-cols-2 gap-4">
                    {/* 상품명 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">상품명</p>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                            required
                        />
                    </div>

                    {/* 상품 가격 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">상품 가격</p>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                            required
                        />
                    </div>

                    {/* 카테고리 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">카테고리</p>
                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                        >
                            <option value="전자제품">전자제품</option>
                            <option value="의류">의류</option>
                            <option value="가구">가구</option>
                            <option value="식품">식품</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>

                    {/* 판매 상태 */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">판매 상태</p>
                        <select
                            name="status"
                            value={product.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                        >
                            <option value="판매중">판매중</option>
                            <option value="판매중지">판매중지</option>
                            <option value="품절">품절</option>
                        </select>
                    </div>

                    {/* 재고 수량 */}
                    <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
                        <p className="text-sm text-gray-600 mb-1">재고 수량</p>
                        <input
                            type="number"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 상품 설명 */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    상품 설명
                </h2>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    rows={4}
                    required
                />
            </div>

            {/* 저장 버튼 */}
            <div className="text-right mt-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                >
                    저장하기
                </button>
            </div>
        </form>
    );
}

export default ModifyProductComponent;
