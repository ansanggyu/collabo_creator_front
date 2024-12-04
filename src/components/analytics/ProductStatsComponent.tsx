import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IProductStats, IUserCategory } from "../../types/iproduct.ts";
import { getCategoriesByCreator } from "../../apis/product/productAPI.ts";
import { getProductStats } from "../../apis/analytics/analyticsAPI.ts";

function ProductStatsComponent() {
    const creatorId = useSelector((state: RootState) => state.signin.creatorId); // Redux에서 creatorId 가져오기
    const [categories, setCategories] = useState<IUserCategory[]>([
        { categoryNo: 0, categoryName: "전체" },
    ]);
    const [category, setCategory] = useState<number>(0);
    const [dateRange, setDateRange] = useState({
        start: "2023-01-01",
        end: "2024-12-31",
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [stats, setStats] = useState<IProductStats[]>([]); // 상태 타입을 IProductStats[]로 설정

    // 카테고리 불러오기
    useEffect(() => {
        const fetchCategories = async () => {
            if (!creatorId || creatorId.trim() === "") {
                console.error("creatorId가 설정되지 않았습니다.");
                return;
            }
            try {
                const result = await getCategoriesByCreator(creatorId);
                setCategories([{ categoryNo: 0, categoryName: "전체" }, ...result]);
            } catch (error) {
                console.error("카테고리 불러오기 실패:", error);
            }
        };

        fetchCategories();
    }, [creatorId]);

    // 상품 통계 데이터 불러오기
    useEffect(() => {
        const fetchStats = async () => {
            if (!creatorId || creatorId.trim() === "") {
                console.error("Redux 상태에서 creatorId를 가져오지 못했습니다.");
                return;
            }

            try {
                console.log("Fetching product stats with the following parameters:");
                console.log("creatorId:", creatorId);
                console.log("dateRange:", dateRange);

                const result = await getProductStats(
                    creatorId,
                    dateRange.start,
                    dateRange.end,
                    category > 0 ? category : undefined, // 카테고리 필터
                    searchTerm.trim() || undefined // 검색어 필터
                );

                console.log("API Response:", result);
                setStats(result); // API 결과를 상태에 저장
            } catch (error) {
                console.error("상품 통계 불러오기 실패:", error);
                alert("상품 통계를 불러오는 중 오류가 발생했습니다.");
            }
        };

        fetchStats();
    }, [creatorId, dateRange, category, searchTerm]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(Number(e.target.value));
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
                            <option key={cat.categoryNo} value={cat.categoryNo}>
                                {cat.categoryName}
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
                        <th className="px-4 py-2 text-right">판매 수량</th>
                        <th className="px-4 py-2 text-right">환불 수</th>
                        <th className="px-4 py-2 text-right">상품 매출액 (₩)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stats.map((stat, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-2 text-left">{stat.categoryName}</td>
                            <td className="px-4 py-2 text-left">{stat.productName}</td>
                            <td className="px-4 py-2 text-right">{stat.totalSold}</td>
                            <td className="px-4 py-2 text-right">{stat.totalRefunded}</td>
                            <td className="px-4 py-2 text-right">
                                {stat.totalSales.toLocaleString()}₩
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
