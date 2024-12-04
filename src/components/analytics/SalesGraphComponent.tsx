import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { getCreatorAnalytics } from "../../apis/analytics/analyticsAPI.ts";
import { RootState } from "../../store.ts";
import axios from "axios";
import {ICreatorAnalytics} from "../../types/iproduct.ts";

// Chart.js 필수 모듈 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

    const getKoreanMonthName = (monthName: string): string => {
        const date = new Date(`${monthName} 1, 2000`); // 임의의 날짜 생성
        return new Intl.DateTimeFormat("ko-KR", { month: "long" }).format(date); // 한국어 월 이름 반환
    };

    const lineData = {
        labels,
        datasets: [
            {
                label: `월별 총 매출 (₩)`,
                data: salesData,
                borderColor: "rgba(30, 136, 229, 0.7)",
                backgroundColor: "rgba(30, 136, 229, 0.2)",
                fill: true,
                tension: 0.4, // 부드러운 곡선 효과
                pointBorderColor: "rgba(30, 136, 229, 1)",
                pointBackgroundColor: "white",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
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

                const updatedLabels = data.map((item: ICreatorAnalytics) => getKoreanMonthName(item.month));
                const updatedSalesData = data.map((item: ICreatorAnalytics) => item.totalSales);

                setLabels(updatedLabels);
                setSalesData(updatedSalesData);
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.error("Failed to fetch Product Sales data:", error.response?.data);}
                throw new Error("Unable to retrieve getCreatorAnalytics. Please try again later.");
            }
        };

        fetchAnalytics();
    }, [creatorId, dateRange]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">매출 그래프</h1>

            {/* 날짜 필터 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-bold mb-2">시작 날짜</label>
                    <input
                        type="date"
                        name="start"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="border rounded px-3 py-2 w-full shadow-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-2">종료 날짜</label>
                    <input
                        type="date"
                        name="end"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="border rounded px-3 py-2 w-full shadow-sm"
                    />
                </div>
            </div>

            {/* 꺾은선 그래프 */}
            <div className="h-[300px] mb-6">
                <Line data={lineData} options={{ maintainAspectRatio: false }} />
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
