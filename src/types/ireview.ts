export interface IReviewImage {
    reviewImageNo: number;
    reviewImageUrl: string;
    reviewImageOrd: number;
}

export interface IReview {
    reviewNo: number;
    customerName: string;
    rating: number;
    createdAt: string;
    creatorName: string;
    productName: string;
    productDescription: string;
    reviewImages: IReviewImage[];
    comment: string;
    reply: string;
}