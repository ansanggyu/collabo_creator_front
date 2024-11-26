import { useState } from "react";

function InventoryComponent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");

    const inventoryData = [
        { id: 1, name: "상품 1", price: 10000, stock: 10, thumbnail: "" },
        { id: 2, name: "상품 2", price: 20000, stock: 2, thumbnail: "" },
        { id: 3, name: "상품 3", price: 15000, stock: 0, thumbnail: "" },
        { id: 4, name: "상품 4", price: 50000, stock: 5, thumbnail: "" },
    ];

    // 필터링된 데이터
    const filteredData = inventoryData.filter((product) => {
        const matchesSearch = product.name.includes(searchTerm);
        if (filter === "low-stock") return product.stock > 0 && product.stock <= 5 && matchesSearch;
        if (filter === "out-of-stock") return product.stock === 0 && matchesSearch;
        return matchesSearch; // "all"
    });

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* 검색 및 필터 섹션 */}
            <div className="flex justify-between items-center mb-6">
                {/* 검색창 */}
                <input
                    type="text"
                    placeholder="상품명 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* 필터 버튼 */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                    >
                        전체
                    </button>
                    <button
                        onClick={() => setFilter("low-stock")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            filter === "low-stock" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                    >
                        재고 부족
                    </button>
                    <button
                        onClick={() => setFilter("out-of-stock")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            filter === "out-of-stock" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                    >
                        품절
                    </button>
                </div>
            </div>

            {/* 상품 테이블 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* 테이블 헤더 */}
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            썸네일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상품명
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            가격
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            재고
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            액션
                        </th>
                    </tr>
                    </thead>

                    {/* 테이블 본문 */}
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((product) => (
                        <tr key={product.id}>
                            {/* 썸네일 */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-md">
                                    <span className="text-gray-400 text-sm">No Image</span>
                                </div>
                            </td>
                            {/* 상품명 */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.name}</td>
                            {/* 가격 */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {product.price.toLocaleString()}원
                            </td>
                            {/* 재고 */}
                            <td
                                className={`px-6 py-4 whitespace-nowrap text-sm ${
                                    product.stock === 0
                                        ? "text-red-600"
                                        : product.stock <= 5
                                            ? "text-yellow-600"
                                            : "text-green-600"
                                }`}
                            >
                                {product.stock > 0 ? `${product.stock}개` : "품절"}
                            </td>
                            {/* 액션 버튼 */}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                <button className="text-red-600 hover:text-red-800">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 데이터가 없을 때 */}
            {filteredData.length === 0 && (
                <p className="text-center text-gray-500 mt-6">해당 조건에 맞는 상품이 없습니다.</p>
            )}
        </div>
    );
}

export default InventoryComponent;