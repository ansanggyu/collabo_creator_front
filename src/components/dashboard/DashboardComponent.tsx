import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { getProductList } from "../../apis/product/productAPI";
import { getOrderList } from "../../apis/order/orderAPI";
import { getReviewList } from "../../apis/review/reviewAPI";
import { getCreatorAnalytics, getRefundStats } from "../../apis/analytics/analyticsAPI";
import { IProduct } from "../../types/iproduct";
import { IOrder } from "../../types/iorder";
import { IReview } from "../../types/ireview";

// Chart.js 필수 모듈 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const DashboardComponent = () => {
    const creatorId = useSelector((state: RootState) => state.signin.creatorId);

    const [products, setProducts] = useState<IProduct[]>([]);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [salesData, setSalesData] = useState<number[]>([]);
    const [refundStats, setRefundStats] = useState<{ status: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            if (!creatorId) return;

            setLoading(true);
            try {
                // 상품, 주문, 리뷰 데이터
                const [productData, orderData, reviewData] = await Promise.all([
                    getProductList(1, 5, creatorId),
                    getOrderList(1, 5, creatorId),
                    getReviewList(1, 5, creatorId),
                ]);

                setProducts(productData.dtoList || []);
                setOrders(orderData.dtoList || []);
                setReviews(reviewData.dtoList || []);

                // 꺾은선 그래프 데이터
                const analyticsData = await getCreatorAnalytics(creatorId, "2023-01-01", "2024-12-31");
                setLabels(analyticsData.map((item) => `${item.month}월`));
                setSalesData(analyticsData.map((item) => item.totalSales));

                // 환불/취소 통계 데이터
                const refundData = await getRefundStats(creatorId, "2023-01-01", "2024-12-31");
                setRefundStats(refundData);
            } catch (error) {
                console.error("대시보드 데이터 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [creatorId]);

    // 꺾은선 그래프 데이터
    const lineData = {
        labels,
        datasets: [
            {
                label: "월별 총 매출 (₩)",
                data: salesData,
                borderColor: "rgba(30, 136, 229, 0.7)",
                backgroundColor: "rgba(30, 136, 229, 0.2)",
                fill: true,
                tension: 0.4,
                pointBorderColor: "rgba(30, 136, 229, 1)",
                pointBackgroundColor: "white",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
            },
        ],
    };

    // 바 그래프 데이터
    const barData = {
        labels: refundStats.map((stat) => stat.status),
        datasets: [
            {
                label: "환불/취소 건수",
                data: refundStats.map((stat) => stat.count),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* 환영 메시지 */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold">
                    {creatorId ? `${creatorId}님, 환영합니다!` : "환영합니다!"}
                </h1>
                <p className="text-sm">대시보드를 통해 데이터를 확인하세요.</p>
            </div>

            {loading ? (
                <div className="text-center text-gray-500">로딩 중...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 상품 목록 */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">최근 상품 목록</h2>
                        <ul className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <li key={product.productNo} className="py-2 flex justify-between items-center">
                                    <span>{product.productName}</span>
                                    <span className="text-gray-500">{product.productPrice.toLocaleString()}원</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 주문 목록 */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">최근 주문 목록</h2>
                        <ul className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <li key={order.orderNo} className="py-2 flex justify-between items-center">
                                    <span>#{order.orderNo} - {order.customerName}</span>
                                    <span className="text-gray-500">{order.totalPrice.toLocaleString()}원</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 리뷰 목록 */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">최근 리뷰</h2>
                        <ul className="divide-y divide-gray-200">
                            {reviews.map((review) => (
                                <li key={review.reviewNo} className="py-2">
                                    <p className="font-medium">{review.productName}</p>
                                    <p className="text-gray-500 text-sm">{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 매출 그래프 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 col-span-2">
                        <h2 className="text-lg font-semibold mb-4">매출 통계</h2>
                        <div className="h-[300px]">
                            <Line data={lineData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* 환불 통계 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 col-span-1">
                        <h2 className="text-lg font-semibold mb-4">환불/취소 통계</h2>
                        <div className="h-[300px]">
                            <Bar data={barData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* 최근 알림 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 col-span-3">
                        <h2 className="text-lg font-semibold mb-4">최근 알림</h2>
                        <div className="text-gray-500">알림이 없습니다.</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardComponent;
