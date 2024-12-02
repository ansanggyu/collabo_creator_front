export interface IQnAImage {
    qnaImageNo: number;
    qnaImageUrl: string;
    qnaImageOrd: number;
}

export interface IQnA {
    qnaNo: number;
    productName: string;
    customerName: string;
    question: string;
    answer: string;
    qnaImages: IQnAImage[];
    createdAt: string;
}