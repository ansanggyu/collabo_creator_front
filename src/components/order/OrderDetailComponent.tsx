type OrderItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    thumbnail?: string;
};

type Order = {
    orderNumber: string;
    orderDate: string;
    customer: string;
    phone: string;
    address: string;
    items: OrderItem[];
    totalPrice: number;
    paymentType: string;
    status: string;
};

function OrderDetailModal({
                              order,
                              onClose,
                          }: {
    order: Order; // 주문 타입
    onClose: () => void; // 함수 타입
}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg"
                >
                    ✕
                </button>

                {/* 주문 정보 */}
                <h1 className="text-xl font-bold mb-4">주문 상세 정보</h1>
                <p>
                    <strong>주문 번호:</strong> {order.orderNumber}
                </p>
                <p>
                    <strong>주문 일자:</strong> {order.orderDate}
                </p>
                <p>
                    <strong>주문 상태:</strong>{" "}
                    <span className="text-blue-600 font-medium">{order.status}</span>
                </p>

                {/* 주문자 정보 */}
                <h2 className="text-lg font-semibold mt-6 mb-2">주문자 정보</h2>
                <p>
                    <strong>이름:</strong> {order.customer}
                </p>
                <p>
                    <strong>전화번호:</strong> {order.phone}
                </p>
                <p>
                    <strong>주소:</strong> {order.address}
                </p>

                {/* 상품 목록 */}
                <h2 className="text-lg font-semibold mt-6 mb-2">주문 상품</h2>
                <ul className="space-y-2">
                    {order.items.map((item: OrderItem) => (
                        <li key={item.id} className="flex items-center space-x-4">
                            <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-gray-400 text-sm">No Image</span>
                            </div>
                            <div>
                                <p>{item.name}</p>
                                <p className="text-gray-500">
                                    {item.price.toLocaleString()}원 x {item.quantity}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* 주문 상태 변경 */}
                <h2 className="text-lg font-semibold mt-6 mb-2">주문 상태 변경</h2>
                <div className="flex space-x-4">
                    {["입금대기", "배송 준비 처리", "발송 처리", "환불 처리"].map((status) => (
                        <button
                            key={status}
                            onClick={() => alert(`상태 변경: ${status}`)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderDetailModal;