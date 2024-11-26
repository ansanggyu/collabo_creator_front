import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Chart.js 필수 모듈 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardComponent =()=> {
    const recentProducts = [
        { id: 1, name: "스마트폰", price: 1000000, stock: "충분" },
        { id: 2, name: "노트북", price: 1500000, stock: "부족" },
        { id: 3, name: "태블릿", price: 800000, stock: "품절" },
    ];

    const recentOrders = [
        { id: 101, customer: "홍길동", total: 50000, status: "배송 완료" },
        { id: 102, customer: "김철수", total: 75000, status: "배송 중" },
        { id: 103, customer: "이영희", total: 30000, status: "주문 취소" },
    ];

    const recentReviews = [
        { id: 1, customer: "박민수", rating: 5, comment: "정말 좋아요!" },
        { id: 2, customer: "최유리", rating: 4, comment: "괜찮은 제품입니다." },
        { id: 3, customer: "이하늘", rating: 3, comment: "보통이에요." },
    ];
    const totalRating = recentReviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = (totalRating / recentReviews.length).toFixed(1);

    const notifications = [
        { id: 1, message: "새로운 주문이 접수되었습니다.", time: "10분 전" },
        { id: 2, message: "재고가 부족한 상품이 있습니다.", time: "30분 전" },
        { id: 3, message: "리뷰가 등록되었습니다.", time: "1시간 전" },
    ];

    const pieData = {
        labels: ["전자제품", "의류", "가구"],
        datasets: [
            {
                data: [60, 25, 15],
                backgroundColor: ["#1E88E5", "#FFC107", "#8E24AA"],
                hoverBackgroundColor: ["#1976D2", "#FFA000", "#6A1B9A"],
            },
        ],
    };

    const barData = {
        labels: ["1월", "2월", "3월", "4월", "5월"],
        datasets: [
            {
                label: "월별 매출 (₩)",
                data: [500, 700, 800, 600, 900],
                backgroundColor: "rgba(30, 136, 229, 0.7)",
                hoverBackgroundColor: "rgba(30, 136, 229, 1)",
            },
        ],
    };

    return (
            <div className="p-4 bg-gray-50 h-screen grid grid-rows-3 grid-cols-3 gap-4">
                {/* 상품 리스트 */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden text-sm col-span-1">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2">
                        <h3 className="text-base font-semibold">최근 상품 리스트</h3>
                    </div>
                    <div className="p-2">
                        <ul className="space-y-1">
                            {recentProducts.map((product) => (
                                <li key={product.id} className="flex justify-between text-xs">
                                    <span>{product.name}</span>
                                    <span className="text-gray-600">{product.price.toLocaleString()}원</span>
                                    <span
                                        className={`${
                                            product.stock === "충분"
                                                ? "text-green-600"
                                                : product.stock === "부족"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                        }`}
                                    >
                    {product.stock}
                  </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 주문 내역 */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden text-sm col-span-1">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-2">
                        <h3 className="text-base font-semibold">최근 주문 내역</h3>
                    </div>
                    <div className="p-2">
                        <ul className="space-y-1">
                            {recentOrders.map((order) => (
                                <li key={order.id} className="flex justify-between text-xs">
                                    <span>#{order.id}</span>
                                    <span>{order.customer}</span>
                                    <span className="text-gray-600">{order.total.toLocaleString()}원</span>
                                    <span
                                        className={`${
                                            order.status === "배송 완료"
                                                ? "text-green-600"
                                                : order.status === "배송 중"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                        }`}
                                    >
                    {order.status}
                  </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 리뷰 목록 */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden text-sm col-span-1">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-2">
                        <h3 className="text-base font-semibold">최근 리뷰</h3>
                    </div>
                    <div className="p-2">
                        <p className="text-sm font-semibold mb-2">평균 별점: {avgRating}/5</p>
                        <ul className="space-y-1">
                            {recentReviews.map((review) => (
                                <li key={review.id} className="flex justify-between text-xs">
                                    <span>{review.customer}</span>
                                    <span className="text-gray-600">{review.rating}점</span>
                                    <span className="italic text-gray-500">{review.comment}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 매출 및 통계 */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden text-sm col-span-2 row-span-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-2">
                        <h3 className="text-base font-semibold">매출 및 통계</h3>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4 h-full">
                        {/* 상품별 판매 비율 */}
                        <div className="flex flex-col items-center justify-center">
                            <h4 className="font-semibold text-sm mb-2">상품별 판매 비율</h4>
                            <div className="w-[95%] h-[250px]"> {/* 크기를 약간 키움 */}
                                <Pie data={pieData} options={{maintainAspectRatio: false}}/>
                            </div>
                        </div>
                        {/* 월별 매출 */}
                        <div className="flex flex-col items-center justify-center">
                            <h4 className="font-semibold text-sm mb-2">월별 매출</h4>
                            <div className="w-[95%] h-[250px]"> {/* 크기를 약간 키움 */}
                                <Bar data={barData} options={{maintainAspectRatio: false}}/>
                            </div>
                        </div>
                    </div>
                </div>


                {/* 알림 관리 */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden text-sm col-span-1">
                    <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-2">
                        <h3 className="text-base font-semibold">최근 알림</h3>
                    </div>
                    <div className="p-2">
                        <ul className="space-y-1">
                            {notifications.map((notification) => (
                                <li key={notification.id} className="flex justify-between text-xs">
                                    <span>{notification.message}</span>
                                    <span className="text-gray-500">{notification.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
    );
};

export default DashboardComponent;