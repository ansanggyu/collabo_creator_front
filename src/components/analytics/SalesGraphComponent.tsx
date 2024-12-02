import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { getCreatorAnalytics } from "../../apis/analytics/analyticsAPI.ts";
import { RootState } from "../../store.ts";

// Chart.js 필수 모듈 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SalesGraphComponent() {

    const creatorId = useSelector((state: RootState) => state.signin.creatorId);
    const [dateRange, setDateRange] = useState({
        start: "2023-01-01",
        end: "2024-12-24",
    });
    const [salesData, setSalesData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    const totalSales = salesData.reduce((acc, curr) => acc + curr, 0);

    const growthRates = salesData.map((value, index, array) => {
        if (index === 0) return 0;
        return (((value - array[index - 1]) / array[index - 1]) * 100).toFixed(2);
    });

    const barData = {
        labels,
        datasets: [
            {
                label: `월별 총 매출 (₩)`,
                data: salesData,
                backgroundColor: "rgba(30, 136, 229, 0.7)",
                hoverBackgroundColor: "rgba(30, 136, 229, 1)",
            },
        ],
    };

    useEffect(() => {
        if (!creatorId || creatorId.trim() === '') {
            console.error("creatorId가 설정되지 않았습니다. 로그인 시도 필요.");
            return;
        }

        const fetchAnalytics = async () => {
            try {
                const data = await getCreatorAnalytics(creatorId, dateRange.start, dateRange.end);
                console.log("API Response Data:", data);

                const updatedLabels = data.map((item: any) => item.month);
                const updatedSalesData = data.map((item: any) => item.totalSales);

                setLabels(updatedLabels);
                setSalesData(updatedSalesData);
            } catch (error) {
                console.error("Failed to fetch Product Sales data:", error.message);
            }
        };

        fetchAnalytics();
    }, [creatorId, dateRange]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">매출 그래프</h1>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-bold mb-2">시작 날짜</label>
                    <input
                        type="date"
                        name="start"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">종료 날짜</label>
                    <input
                        type="date"
                        name="end"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
            </div>

            <div className="h-[300px] mb-6">
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>

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
                                {salesData[index]?.toLocaleString()}₩
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
