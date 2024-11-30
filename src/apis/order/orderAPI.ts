import axios from "axios";
import { IPageResponse } from "../../types/ipageresponse.ts";
import { IOrder } from "../../types/iorder.ts";

const host = "http://localhost:8080/api/order";

// 주문 리스트 가져오기
export const getOrderList = async (page?: number, size?: number): Promise<IPageResponse<IOrder>> => {
    const pageValue: number = page || 1;
    const sizeValue: number = size || 10;

    const res = await axios.get(`${host}/list`, {
        params: { page: pageValue, size: sizeValue },
    });

    return res.data;
};

// 특정 주문 상세 정보 가져오기
export const getOrderDetail = async (orderNo: number): Promise<IOrder> => {
    const res = await axios.get(`${host}/${orderNo}`);
    return res.data;
};
