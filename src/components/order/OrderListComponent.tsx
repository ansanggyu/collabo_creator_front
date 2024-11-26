import { useState } from "react";
import OrderDetailModal from "./OrderDetailComponent";

type OrderItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
};

type Order = {
    id: number;
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

function OrderListComponent() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const orders: Order[] = [
        {
            id: 1,
            orderNumber: "2021041688344",
            orderDate: "2023-11-01 12:30",
            customer: "김용석",
            phone: "010-1234-5678",
            address: "서울특별시 강남구 테헤란로 123",
            items: [
                {
                    id: "101",
                    name: "고추장 불고기 500g",
                    price: 59000,
                    quantity: 10,
                    thumbnail: "",
                },
                {
                    id: "102",
                    name: "불타는 돼지껍데기 400g*3팩",
                    price: 49500,
                    quantity: 5,
                    thumbnail: "",
                },
            ],
            totalPrice: 108500,
            paymentType: "현금영수증",
            status: "입금대기",
        },
    ];

    const openModal = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            주문번호/시각
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            주문자 정보
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            주문 상품
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                            상품 금액
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            상태
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                    onClick={() => openModal(order)}
                                    className="text-blue-500 underline hover:text-blue-700"
                                >
                                    {order.orderNumber}
                                </button>
                                <div className="text-gray-500">{order.orderDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div>{order.customer}</div>
                                <div className="text-gray-500">{order.phone}</div>
                                <div className="text-gray-500">{order.address}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-2 mb-2"
                                    >
                                        <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-md">
                                            <span className="text-gray-400 text-sm">No Image</span>
                                        </div>
                                        <div>{item.name}</div>
                                    </div>
                                ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                {order.totalPrice.toLocaleString()}원
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                {order.status}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedOrder && (
                <OrderDetailModal order={selectedOrder} onClose={closeModal} />
            )}
        </div>
    );
}

export default OrderListComponent;