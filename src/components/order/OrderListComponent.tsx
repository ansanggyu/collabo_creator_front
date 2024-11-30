import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getOrderList } from "../../apis/order/orderAPI.ts";
import { IOrder } from "../../types/iorder.ts";
import { IPageResponse } from "../../types/ipageresponse.ts";
import OrderDetailComponent from "./OrderDetailComponent";
import PageComponent from "../common/PageComponent";

function OrderListComponent() {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [pageResponse, setPageResponse] = useState<IPageResponse<IOrder> | null>(null);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // 선택된 주문 ID
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useSearchParams();
    const currentPage = Number(query.get("page")) || 1;

    const fetchOrders = async (page: number) => {
        setLoading(true);
        try {
            const response = await getOrderList(page, 10); // 페이지 번호와 페이지 크기 전달
            setOrders(response.dtoList || []);
            setPageResponse(response);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    const openModal = (orderId: string) => {
        setSelectedOrderId(orderId); // 모달에 표시할 주문 ID 설정
    };

    const closeModal = () => {
        setSelectedOrderId(null); // 모달 닫기
    };

    if (loading) {
        return <div className="p-6 bg-gray-50 min-h-screen">Loading...</div>;
    }

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
                        <tr key={order.orderNo}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                    onClick={() => openModal(order.orderNo.toString())} // 모달 열기
                                    className="text-blue-500 underline hover:text-blue-700"
                                >
                                    {order.orderNo}
                                </button>
                                <div className="text-gray-500">{order.orderDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div>{order.customerName}</div>
                                <div className="text-gray-500">{order.customerPhone}</div>
                                <div className="text-gray-500">{order.customerAddr}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {order.orderItems.slice(0, 2).map((item) => (
                                    <div
                                        key={item.productNo}
                                        className="flex items-center space-x-2 mb-2"
                                    >
                                        <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-md">
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
                                        <div>{item.productName}</div>
                                    </div>
                                ))}
                                {order.orderItems.length > 2 && (
                                    <div className="text-gray-500">
                                        외 {order.orderItems.length - 2}건
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                {order.totalPrice.toLocaleString()}원
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                {order.orderStatus}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* 페이징 UI */}
            {pageResponse && (
                <PageComponent<IOrder> pageResponse={pageResponse} />
            )}

            {/* 모달 렌더링 */}
            {selectedOrderId && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <OrderDetailComponent
                        orderId={selectedOrderId} // 선택된 주문 ID 전달
                        onClose={closeModal} // 모달 닫기 핸들러 전달
                    />
                </div>
            )}
        </div>
    );
}

export default OrderListComponent;
