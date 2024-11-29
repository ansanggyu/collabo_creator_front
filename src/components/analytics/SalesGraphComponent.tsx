import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Chart.js 필수 모듈 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SalesGraphComponent() {
    const [selectedProduct, setSelectedProduct] = useState("태블릿");
    const [dateRange, setDateRange] = useState({
        start: "2023-01-01",
        end: "2023-12-31",
    });

    // 더미 데이터
    const salesData: { [key: string]: number[] } = {
        "전체": [500, 700, 800, 600, 900],
        "태블릿": [150, 150, 100, 100, 100],
    };

    const labels = ["1월", "2월", "3월", "4월", "5월"];
    const totalSales = salesData[selectedProduct].reduce((acc, curr) => acc + curr, 0);

    // 월별 증감률 계산
    const growthRates = salesData[selectedProduct].map((value, index, array) => {
        if (index === 0) return 0; // 첫 달은 증감률 없음
        return (((value - array[index - 1]) / array[index - 1]) * 100).toFixed(2);
    });

    const barData = {
        labels: labels,
        datasets: [
            {
                label: `${selectedProduct} 매출 (₩)`,
                data: salesData[selectedProduct],
                backgroundColor: "rgba(30, 136, 229, 0.7)",
                hoverBackgroundColor: "rgba(30, 136, 229, 1)",
            },
        ],
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">매출 그래프</h1>

            {/* 필터 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                    {/*카테고리 먼저 선택하고, 카테고리에 맞는 상품을 선택 할 수 있어야 함.*/}
                    <label className="block text-sm font-bold mb-2">상품 선택</label>
                    <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    >
                        {Object.keys(salesData).map((product) => (
                            <option key={product} value={product}>
                                {product}
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
                        onChange={(e) =>
                            setDateRange({ ...dateRange, start: e.target.value })
                        }
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">종료 날짜</label>
                    <input
                        type="date"
                        name="end"
                        value={dateRange.end}
                        onChange={(e) =>
                            setDateRange({ ...dateRange, end: e.target.value })
                        }
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
            </div>

            {/* 그래프 */}
            <div className="h-[300px] mb-6">
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>

            {/* 상세 데이터 테이블 */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-4">총 매출: {totalSales.toLocaleString()}₩</h2>
                <table className="table-auto w-full text-sm border-collapse border border-gray-200">
                    <thead>
                    <tr className="bg-gray-300 border-b border-gray-400">
                        <th className="px-4 py-2 text-left">월</th>
                        <th className="px-4 py-2 text-right">매출액 (₩)</th>
                        <th className="px-4 py-2 text-right">증감률 (%)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {labels.map((label, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-2 text-left">{label}</td>
                            <td className="px-4 py-2 text-right">
                                {salesData[selectedProduct][index].toLocaleString()}₩
                            </td>
                            <td className="px-4 py-2 text-right">
                                {index === 0 ? "-" : `${growthRates[index]}%`}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalesGraphComponent;
