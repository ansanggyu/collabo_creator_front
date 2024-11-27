import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductListComponent() {
    const navigate = useNavigate();

    // 상태 관리
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("전체");
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [products] = useState([
        {
            id: 1,
            name: "상품 1",
            stock: 10,
            price: 10000,
            category: "전자제품",
            status: "판매중",
            imageUrl: "https://via.placeholder.com/300", // 이미지 URL
        },
        {
            id: 2,
            name: "상품 2",
            stock: 0,
            price: 20000,
            category: "의류",
            status: "품절",
            imageUrl: "",
        },
        {
            id: 3,
            name: "상품 3",
            stock: 5,
            price: 15000,
            category: "가구",
            status: "판매중",
            imageUrl: "https://via.placeholder.com/300",
        },
        {
            id: 4,
            name: "상품 4",
            stock: 0,
            price: 30000,
            category: "식품",
            status: "판매중지",
            imageUrl: "",
        },
        {
            id: 5,
            name: "상품 5",
            stock: 8,
            price: 12000,
            category: "기타",
            status: "판매중",
            imageUrl: "https://via.placeholder.com/300",
        },
    ]);

    const statistics = {
        totalProducts: products.length,
        activeProducts: products.filter((p) => p.status === "판매중").length,
        inactiveProducts: products.filter((p) => p.status === "판매중지").length,
        outOfStock: products.filter((p) => p.stock === 0).length,
    };

    // 필터링된 상품 계산
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.includes(searchQuery);
        const matchesStatus =
            selectedStatus === "전체" || product.status === selectedStatus;
        const matchesCategory =
            selectedCategory === "전체" || product.category === selectedCategory;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const goToDetail = (id: number) => {
        navigate(`/product/detail/${id}`);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* 상단 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700">전체 상품</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.totalProducts}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700">판매중</p>
                    <p className="text-2xl font-bold text-green-500">{statistics.activeProducts}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700">판매중지</p>
                    <p className="text-2xl font-bold text-red-500">{statistics.inactiveProducts}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700">품절</p>
                    <p className="text-2xl font-bold text-orange-500">{statistics.outOfStock}</p>
                </div>
            </div>

            {/* 검색 조건 */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* 검색 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            상품명 검색
                        </label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="상품명을 입력하세요"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* 카테고리 필터 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            카테고리
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="전체">전체</option>
                            <option value="전자제품">전자제품</option>
                            <option value="의류">의류</option>
                            <option value="가구">가구</option>
                            <option value="식품">식품</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>

                    {/* 상태 필터 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            상태
                        </label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="전체">전체</option>
                            <option value="판매중">판매중</option>
                            <option value="판매중지">판매중지</option>
                            <option value="품절">품절</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 text-right">
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedStatus("전체");
                            setSelectedCategory("전체");
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        필터 초기화
                    </button>
                </div>
            </div>

            {/* 상품 리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        {/* 상품 이미지 */}
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-xl">이미지 없음</span>
                            )}
                        </div>

                        {/* 상품 상세 정보 */}
                        <div className="p-4 space-y-2">
                            {/* 상품명 */}
                            <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>

                            {/* 판매 상태 */}
                            <div className="flex items-center space-x-2">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                        product.status === "판매중"
                                            ? "bg-green-100 text-green-700"
                                            : product.status === "품절"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {product.status}
                                </span>
                            </div>

                            {/* 재고 수량 */}
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-700">재고수량:</span>{" "}
                                {product.stock > 0 ? `${product.stock}개` : "품절"}
                            </p>

                            {/* 판매가 */}
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-700">판매가:</span>{" "}
                                {product.price.toLocaleString()}원
                            </p>
                        </div>

                        {/* 상세보기 버튼 */}
                        <div className="p-4 border-t">
                            <button
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={() => goToDetail(product.id)}
                            >
                                상세 보기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductListComponent;
