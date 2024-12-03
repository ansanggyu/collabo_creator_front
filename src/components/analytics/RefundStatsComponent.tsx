import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {getRefundStats} from "../../apis/analytics/analyticsAPI.ts";

// Chart.js 필수 모듈 등록
ChartJS.register(ArcElement, Tooltip, Legend);

function RefundStatsComponent() {
    const creatorId = useSelector((state: RootState) => state.signin.creatorId);
    const [dateRange, setDateRange] = useState({
        start: "2023-01-01",
        end: "2024-12-31",
    });
    const [refundStats, setRefundStats] = useState<{ status: string; count: number; percentage: number }[]>([]);

    // 데이터 로드
    useEffect(() => {
        const fetchRefundStats = async () => {
            if (!creatorId || creatorId.trim() === "") {
                console.error("Redux에서 creatorId를 가져오지 못했습니다.");
                return;
            }

            try {
                console.log("Fetching refund stats with parameters:");
                console.log("creatorId:", creatorId);
                console.log("dateRange:", dateRange);

                const result = await getRefundStats(creatorId, dateRange.start, dateRange.end);
                setRefundStats(result);
            } catch (error) {
                console.error("환불/취소 통계 데이터 로드 실패:", error);
                alert("환불/취소 통계 데이터를 불러오는 중 오류가 발생했습니다.");
            }
        };

        fetchRefundStats();
    }, [creatorId, dateRange]);

    // 차트 데이터 생성
    const pieData = {
        labels: refundStats.map((stat) => stat.status),
        datasets: [
            {
                data: refundStats.map((stat) => stat.percentage),
                backgroundColor: ["#E53935", "#FB8C00", "#43A047"],
                hoverBackgroundColor: ["#D32F2F", "#F57C00", "#388E3C"],
            },
        ],
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDateRange({ ...dateRange, [name]: value });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">환불/취소율 통계</h1>

            {/* 필터 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
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
                    {refundStats.map((stat, index) => (
                        <li key={index} className="flex justify-between py-2">
                            <span>{stat.status}</span>
                            <span>{stat.percentage}%</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RefundStatsComponent;
