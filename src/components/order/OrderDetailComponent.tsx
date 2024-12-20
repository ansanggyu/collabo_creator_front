import { useEffect, useState } from "react";
import { getOrderDetail, updateOrderStatus } from "../../apis/order/orderAPI.ts";
import { IOrder } from "../../types/iorder.ts";
import Cookies from "js-cookie";

interface OrderDetailProps {
    orderId: string;
    onClose: () => void;
}

function OrderDetailComponent({ orderId, onClose }: OrderDetailProps) {
    const [order, setOrder] = useState<IOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [creatorId, setCreatorId] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<string>("");

    const orderStatusOptions = [
        { value: "PENDING", label: "배송 준비 처리" },
        { value: "COMPLETED", label: "발송 처리" },
        { value: "CANCELED", label: "환불 처리" },
    ];

    // 쿠키에서 creatorId 가져오기
    useEffect(() => {
        const cookieCreatorLogin = Cookies.get("creatorlogin");
        if (!cookieCreatorLogin) {
            alert("로그인이 필요합니다.");
            throw new Error("쿠키에서 creatorId를 찾을 수 없습니다.");
        }

        try {
            const parsedCookie = JSON.parse(cookieCreatorLogin);
            if (parsedCookie.creatorId) {
                setCreatorId(parsedCookie.creatorId);
            } else {
                throw new Error("쿠키에 creatorId가 없습니다.");
            }
        } catch (error) {
            console.error("쿠키 파싱 중 오류:", error);
            alert("잘못된 로그인 정보입니다.");
        }
    }, []);

    // 주문 상세 정보 가져오기
    useEffect(() => {
        const fetchOrderDetail = async () => {
            if (!creatorId) return;

            setLoading(true);
            try {
                const data = await getOrderDetail(Number(orderId), creatorId);
                setOrder(data);
                setNewStatus(data.orderStatus); // 초기 상태 설정
            } catch (error) {
                console.error("주문 상세 정보 가져오기 실패:", error);
                alert("주문 정보를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId, creatorId]);

    // 주문 상태 변경 처리
    const handleStatusChange = async () => {
        if (!creatorId || !order) return;

        try {
            await updateOrderStatus(order.orderNo, creatorId, newStatus);
            alert("주문 상태가 성공적으로 변경되었습니다.");
            // 변경된 상태 반영을 위해 데이터 새로 고침
            const updatedOrder = await getOrderDetail(order.orderNo, creatorId);
            setOrder(updatedOrder);
        } catch (error) {
            console.error("주문 상태 변경 실패:", error);
            alert("주문 상태 변경에 실패했습니다. 다시 시도해주세요.");
        }
    };

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

    // 총 결제 금액 계산
    const totalAmount = order.orderItems.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0
    );

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
                ✕
            </button>

            <h1 className="text-2xl font-bold mb-6 text-center">주문 상세 정보</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">주문 정보</h2>
                    <p><strong>주문 번호:</strong> {order.orderNo}</p>
                    <p><strong>주문 일자:</strong> {order.orderDate}</p>
                    <p>
                        <strong>주문 상태:</strong>{" "}
                        <span className="text-blue-600 font-medium">{order.orderStatus}</span>
                    </p>
                    <div className="mt-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            주문 상태 변경
                        </label>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            {orderStatusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleStatusChange}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            상태 변경
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">주문자 정보</h2>
                    <p><strong>이름:</strong> {order.customerName}</p>
                    <p><strong>연락처:</strong> {order.customerPhone}</p>
                    <p><strong>주소:</strong> {order.customerAddr}, {order.customerAddrDetail}</p>
                </div>
            </div>

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
