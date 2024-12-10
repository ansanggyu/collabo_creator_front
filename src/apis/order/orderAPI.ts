import jwtAxios from "../../util/jwtUtil.ts";
import { IPageResponse } from "../../types/ipageresponse.ts";
import { IOrder } from "../../types/iorder.ts";

const host = 'http://localhost:8080/api/order';

// 주문 리스트 가져오기
export const getOrderList = async (
    page?: number,
    size?: number,
    creatorId?: string // creatorId를 추가
): Promise<IPageResponse<IOrder>> => {
    const pageValue: number = page || 1;
    const sizeValue: number = size || 10;

    const res = await jwtAxios.get<IPageResponse<IOrder>>(`${host}/list`, {
        params: { page: pageValue, size: sizeValue, creatorId }, // creatorId를 params에 추가
    });

    return res.data;
};

// 특정 주문 상세 정보 가져오기
export const getOrderDetail = async (
    orderNo: number,
    creatorId?: string // creatorId를 추가
): Promise<IOrder> => {
    const res = await jwtAxios.get<IOrder>(`${host}/${orderNo}`, {
        params: { creatorId }, // creatorId를 params에 추가
    });
    return res.data;
};

// 주문 상태 업데이트
export const updateOrderStatus = async (
    orderNo: number,
    creatorId: string,
    newStatus: string
): Promise<void> => {
    try {
        const res = await jwtAxios.put<void>(`${host}/${orderNo}/status`, null, { // body 제거
            params: { creatorId, status: newStatus }, // status를 params로 전달
        });
        return res.data; // 성공적으로 처리되면 API의 응답을 반환
    } catch (error) {
        console.error("Failed to update order status:", error);
        throw new Error("Unable to update order status. Please try again later.");
    }
};