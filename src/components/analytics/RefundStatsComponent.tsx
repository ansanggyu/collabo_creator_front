import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js 필수 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

function RefundStatsComponent() {
    const [category, setCategory] = useState("전체");
    const [dateRange, setDateRange] = useState({
        start: "2023-01-01",
        end: "2023-12-31",
    });

    const categories = ["전체", "전자제품", "의류", "가구"];

    // 더미 데이터
    const refundData = {
        전체: [60, 25, 15],
        전자제품: [50, 30, 20],
        의류: [30, 40, 30],
        가구: [20, 10, 10],
    };

    const pieData = {
        labels: ["환불", "취소", "정상"],
        datasets: [
            {
                data: refundData[category],
                backgroundColor: ["#E53935", "#FB8C00", "#43A047"],
                hoverBackgroundColor: ["#D32F2F", "#F57C00", "#388E3C"],
            },
        ],
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDateRange({ ...dateRange, [name]: value });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">환불/취소율 통계</h1>

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
            </div>

            {/* 그래프 */}
            <div className="h-[300px] mb-6">
                <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>

            {/* 상세 데이터 */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-4">환불/취소 상세 데이터</h2>
                <ul>
                    {pieData.labels.map((label, index) => (
                        <li key={index} className="flex justify-between py-2">
                            <span>{label}</span>
                            <span>{refundData[category][index]}%</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RefundStatsComponent;
