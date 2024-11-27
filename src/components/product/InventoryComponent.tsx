import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InventoryComponent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const navigate = useNavigate();

    const inventoryData = [
        { id: 1, name: "상품 1", price: 10000, stock: 10, thumbnail: "", date: "2024-11-01" },
        { id: 2, name: "상품 2", price: 20000, stock: 2, thumbnail: "", date: "2024-11-20" },
        { id: 3, name: "상품 3", price: 15000, stock: 0, thumbnail: "", date: "2024-11-15" },
        { id: 4, name: "상품 4", price: 50000, stock: 5, thumbnail: "", date: "2024-11-10" },
    ];

    const isWithinDateRange = (productDate) => {
        if (!dateRange.start && !dateRange.end) return true;
        const date = new Date(productDate);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        if (startDate && date < startDate) return false;
        if (endDate && date > endDate) return false;
        return true;
    };

    const sortedData = [...inventoryData].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const order = sortConfig.direction === "asc" ? 1 : -1;

        if (sortConfig.key === "price" || sortConfig.key === "stock") {
            return (a[sortConfig.key] - b[sortConfig.key]) * order;
        }
        if (sortConfig.key === "date") {
            return (new Date(a.date) - new Date(b.date)) * order;
        }
        return 0;
    });

    const filteredData = sortedData.filter((product) => {
        const matchesSearch = product.name.includes(searchTerm);
        const matchesDate = isWithinDateRange(product.date);

        if (filter === "low-stock") return product.stock > 0 && product.stock <= 5 && matchesSearch && matchesDate;
        if (filter === "out-of-stock") return product.stock === 0 && matchesSearch && matchesDate;
        return matchesSearch && matchesDate;
    });

    const handleSort = (key) => {
        setSortConfig((prevState) => ({
            key,
            direction: prevState.key === key && prevState.direction === "asc" ? "desc" : "asc",
        }));
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? "↑" : "↓";
        }
        return "↕"; // 기본 상태 화살표
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex flex-col space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="상품명 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex space-x-4 items-center">
                    <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                        className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span>~</span>
                    <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                        className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
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

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            썸네일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            상품명
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("price")}
                        >
                            가격 {getSortArrow("price")}
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("stock")}
                        >
                            재고 {getSortArrow("stock")}
                        </th>
                        <th
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => handleSort("date")}
                        >
                            등록일 {getSortArrow("date")}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            액션
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-md">
                                    <span className="text-gray-400 text-sm">No Image</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {product.price.toLocaleString()}원
                            </td>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => navigate(`/product/detail/${product.id}`)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {filteredData.length === 0 && (
                <p className="text-center text-gray-500 mt-6">해당 조건에 맞는 상품이 없습니다.</p>
            )}
        </div>
    );
}

export default InventoryComponent;
