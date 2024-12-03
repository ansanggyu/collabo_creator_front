import jwtAxios from "../../util/jwtUtil.ts";
import { IPageResponse } from "../../types/ipageresponse.ts";
import { IOrder } from "../../types/iorder.ts";

const host = "http://localhost:8080/api/order";

// 주문 리스트 가져오기
export const getOrderList = async (
    page?: number,
    size?: number,
    creatorId?: string // creatorId를 추가
): Promise<IPageResponse<IOrder>> => {
    const pageValue: number = page || 1;
    const sizeValue: number = size || 10;

    const res = await jwtAxios.get(`${host}/list`, {
        params: { page: pageValue, size: sizeValue, creatorId }, // creatorId를 params에 추가
    });

    return res.data;
};

// 특정 주문 상세 정보 가져오기
export const getOrderDetail = async (
    orderNo: number,
    creatorId?: string // creatorId를 추가
): Promise<IOrder> => {
    const res = await jwtAxios.get(`${host}/${orderNo}`, {
        params: { creatorId }, // creatorId를 params에 추가
    });
    return res.data;
};