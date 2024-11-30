import { useEffect, useState } from "react";
import { getOrderDetail } from "../../apis/order/orderAPI.ts";
import { IOrder } from "../../types/iorder.ts";

interface OrderDetailProps {
    orderId: string;
    onClose: () => void;
}

function OrderDetailComponent({ orderId, onClose }: OrderDetailProps) {
    const [order, setOrder] = useState<IOrder | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const data = await getOrderDetail(Number(orderId)); // API 호출
                setOrder(data);
            } catch (error) {
                console.error("Failed to fetch order detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    if (loading) {
        return <div className="p-6 bg-white rounded-lg shadow-lg">Loading...</div>;
    }

    if (!order) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-lg">
                주문 정보를 불러올 수 없습니다.
            </div>
        );
    }

    // 총 가격 계산
    const totalAmount = order.orderItems.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0
    );

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto relative">
            {/* 닫기 버튼 */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
                ✕
            </button>

            {/* 주문 상세 정보 */}
            <h1 className="text-2xl font-bold mb-6 text-center">주문 상세 정보</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 주문 정보 */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">주문 정보</h2>
                    <p>
                        <strong>주문 번호:</strong> {order.orderNo}
                    </p>
                    <p>
                        <strong>주문 일자:</strong> {order.orderDate}
                    </p>
                    <p>
                        <strong>주문 상태:</strong>{" "}
                        <span className="text-blue-600 font-medium">{order.orderStatus}</span>
                    </p>
                </div>

                {/* 주문자 정보 */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
                    <p>
                        <strong>이름:</strong> {order.customerName}
                    </p>
                    <p>
                        <strong>연락처:</strong> {order.customerPhone}
                    </p>
                    <p>
                        <strong>주소:</strong> {order.customerAddr}, {order.customerAddrDetail}
                    </p>
                </div>
            </div>

            {/* 주문 상품 */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">주문 상품</h2>
                <ul className="space-y-4">
                    {order.orderItems.map((item) => (
                        <li
                            key={item.productNo}
                            className="flex items-center gap-4 border-b pb-4"
                        >
                            <div className="h-24 w-24 bg-gray-200 rounded-md flex items-center justify-center">
                                {item.productImageUrl ? (
                                    <img
                                        src={item.productImageUrl}
                                        alt={item.productName}
                                        className="h-full w-full object-cover rounded-md"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">No Image</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-gray-500">
                                    {item.productPrice.toLocaleString()}원 x {item.quantity}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 결제 금액 */}
            <div className="mt-6 text-right">
                <h2 className="text-xl font-semibold">결제 금액</h2>
                <p className="text-2xl font-bold text-green-600">
                    {totalAmount.toLocaleString()}원
                </p>
            </div>
        </div>
    );
}

export default OrderDetailComponent;
