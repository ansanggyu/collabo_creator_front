export interface IOrderItem {
    productNo: number;          // 상품 ID (number 타입으로 변경)
    productName: string;        // 상품명
    productPrice: number;       // 상품 가격
    quantity: number;           // 수량
    productImageUrl: string;    // 상품 이미지 URL
}
export interface IOrder {
    orderNo: number;                   // 주문 번호
    orderDate: string;                 // 주문 날짜
    customerName: string;              // 고객 이름
    customerPhone: string;             // 고객 전화번호
    customerAddr: string;              // 고객 주소
    customerAddrDetail: string;        // 고객 상세 주소
    orderItems: IOrderItem[];          // 주문 상품 리스트
    totalPrice: number;                // 총 주문 금액
    orderStatus: string;               // 주문 상태
}
