import {ICreatorAnalytics, IProductStats, IRefundNCancel} from "../../types/iproduct.ts";
import jwtAxios from "../../util/jwtUtil.ts";
import axios from "axios";


const host = "http://localhost:8080/api";

export const getCreatorAnalytics = async (
    creatorId: string,
    startDate: string,
    endDate: string
): Promise<ICreatorAnalytics[]> => {
    try {
        const result = await jwtAxios.get(`${host}/statistics`, {
            params: {
                creatorId,
                startDate: `${startDate}T00:00:00`,
                endDate: `${endDate}T23:59:59`,
            },
        });
        console.log("Successfully fetched analytics for", creatorId);
        console.log(result.data)
        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("Unable to retrieve analytics. Please try again later.");
    }
};

export const getProductStats = async (
    creatorId: string,
    startDate: string,
    endDate: string,
    category?: number, // 카테고리 필터 추가
    searchTerm?: string // 검색어 필터 추가
): Promise<IProductStats[]> => {
    try {
        const result = await jwtAxios.get(`${host}/statistics/product`, {
            params: {
                creatorId,
                startDate: `${startDate}T00:00:00`,
                endDate: `${endDate}T23:59:59`,
                category: category || undefined, // 카테고리가 0이거나 없으면 필터 제외
                searchTerm: searchTerm?.trim() || undefined, // 검색어 필터
            },
        });
        console.log("Successfully fetched product statistics for", creatorId);
        console.log(result.data);
        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("Unable to retrieve product statistics. Please try again later.");
    }
};

export const getRefundStats = async (
    creatorId: string,
    startDate: string,
    endDate: string
): Promise<IRefundNCancel[]> => {
    try {
        const result = await jwtAxios.get(`${host}/refundncancel`, {
            params: {
                creatorId,
                startDate: `${startDate}T00:00:00`,
                endDate: `${endDate}T23:59:59`,
            },
        });
        console.log("Successfully fetched refund and cancel statistics for", creatorId);
        console.log(result.data);
        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        }
        throw new Error("Unable to retrieve refund and cancel statistics. Please try again later.");
    }
};