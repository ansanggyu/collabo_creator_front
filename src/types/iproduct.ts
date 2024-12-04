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
    month: string;
    totalSales: number;
    orderCount: number;
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