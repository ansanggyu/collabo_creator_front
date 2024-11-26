function OrderDetailComponent({ orderId }: { orderId: string }) {
    const order = {
        id: orderId,
        productName: "상품 1",
        quantity: 2,
        price: 20000,
        status: "배송 중",
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Order Detail</h1>
            <p>주문 ID: {order.id}</p>
            <p>상품명: {order.productName}</p>
            <p>수량: {order.quantity}</p>
            <p>가격: {order.price}원</p>
            <p>상태: {order.status}</p>
        </div>
    );
}

export default OrderDetailComponent;
