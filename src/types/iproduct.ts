export interface IProduct{

    productNo : number,
    productName : string,
    productPrice : number,
    stock : number,
    rating ?: number,
    productDescription : string,
    productStatus :string,
    createdAt : string,

    categoryNo : number,
    categoryName : string,

    creatorName : string,

    productImageOrd : number,
    productImageUrl : string

}

export interface IProductRequest {
    productName: string;
    productPrice: number;
    stock: number;
    productDescription: string;
    productStatus: number;
    categoryNo: number;
    creatorId: string;
    productImages: string[];
}

export interface IUserCategory {
    categoryNo: number;
    categoryName: string;
}

export interface ICreatorAnalytics {
    totalPrice: number;
    status: string;
    reason: string;
}

export interface IProductStats {
    categoryName: string; // 카테고리 이름
    productName: string;  // 상품 이름
    totalSold: number;    // 총 판매 수량
    totalRefunded: number; // 환불된 수량
    totalSales: number;   // 매출 금액
}

export interface IRefundNCancel {
    status: string; // 환불, 취소, 발송 처리
    count: number;  // 해당 상태의 건수
    percentage: number; // 해당 상태의 백분율
}

export interface IInventoryProduct {
    id: number; // 상품 ID
    name: string; // 상품명
    price: number; // 가격
    stock: number; // 재고
    thumbnail: string; // 썸네일 URL
    date: string; // 등록일 (YYYY-MM-DD 형식)
}

// 날짜 범위 타입
export interface IDateRange {
    start: string;
    end: string;
}

// 정렬 설정 타입
export interface ISortConfig {
    key: "price" | "stock" | "date" | ""; // 정렬할 키
    direction: "asc" | "desc"; // 정렬 방향
}