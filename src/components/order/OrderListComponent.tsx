function OrderListComponent() {
    const orders = [
        { id: 1, productName: "상품 1", quantity: 2, status: "배송 중" },
        { id: 2, productName: "상품 2", quantity: 1, status: "주문 완료" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Order List</h1>
            <ul>
                {orders.map((order) => (
                    <li key={order.id} className="p-4 border-b">
                        <h2>상품명: {order.productName}</h2>
                        <p>수량: {order.quantity}</p>
                        <p>상태: {order.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderListComponent;
