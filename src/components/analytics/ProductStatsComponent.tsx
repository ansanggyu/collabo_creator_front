import { useState } from "react";

function ProductStatsComponent() {
    const [category, setCategory] = useState("전체");
    const [dateRange, setDateRange] = useState({
        start: "2023-01-01",
        end: "2023-12-31",
    });
    const [searchTerm, setSearchTerm] = useState("");

    const categories = ["전체", "전자제품", "의류", "가구"];

    // 더미 데이터
    const stats = [
        { category: "전자제품", productName: "스마트폰", sales: 100, refunds: 2, revenue: 2000000 },
        { category: "전자제품", productName: "노트북", sales: 50, refunds: 1, revenue: 1500000 },
        { category: "가구", productName: "소파", sales: 30, refunds: 0, revenue: 900000 },
    ];

    const filteredStats = stats.filter((stat) => {
        const matchesCategory = category === "전체" || stat.category === category;
        const matchesSearchTerm = stat.productName.includes(searchTerm);
        return matchesCategory && matchesSearchTerm;
    });

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDateRange({ ...dateRange, [name]: value });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">상품별 매출 통계</h1>

            {/* 필터 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-bold mb-2">카테고리</label>
                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="border rounded px-3 py-2 w-full"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">시작 날짜</label>
                    <input
                        type="date"
                        name="start"
                        value={dateRange.start}
                        onChange={handleDateChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">종료 날짜</label>
                    <input
                        type="date"
                        name="end"
                        value={dateRange.end}
                        onChange={handleDateChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">상품 검색</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="상품명 검색"
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
            </div>

            {/* 상세 데이터 테이블 */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-4">상품별 통계</h2>
                <table className="table-auto w-full text-sm border-collapse border border-gray-200">
                    <thead>
                    <tr className="bg-gray-300 border-b border-gray-400">
                        <th className="px-4 py-2 text-left">카테고리</th>
                        <th className="px-4 py-2 text-left">상품명</th>
                        <th className="px-4 py-2 text-right">판매량</th>
                        <th className="px-4 py-2 text-right">환불 수</th>
                        <th className="px-4 py-2 text-right">총 매출액 (₩)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredStats.map((stat, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-2 text-left">{stat.category}</td>
                            <td className="px-4 py-2 text-left">{stat.productName}</td>
                            <td className="px-4 py-2 text-right">{stat.sales}</td>
                            <td className="px-4 py-2 text-right">{stat.refunds}</td>
                            <td className="px-4 py-2 text-right">
                                {stat.revenue.toLocaleString()}₩
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductStatsComponent;
