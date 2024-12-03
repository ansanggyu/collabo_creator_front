import {ICreatorAnalytics, IProductStats, IRefundNCancel} from "../../types/iproduct.ts";
import jwtAxios from "../../util/jwtUtil.ts";

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
    } catch (error: any) {
        if (error.config) {
            const { baseURL, url, params } = error.config;
            const fullURL = `${baseURL || ""}${url}?${new URLSearchParams(params).toString()}`;
            console.error("Failed URL:", fullURL);
        }
        console.error("Failed to fetch analytics:", error.message);
        throw new Error("Unable to retrieve analytics. Please try again later.");
    }
};

export const getProductStats = async (
    creatorId: string,
    startDate: string,
    endDate: string
): Promise<IProductStats[]> => {
    try {
        const result = await jwtAxios.get(`${host}/statistics/product`, {
            params: {
                creatorId,
                startDate: `${startDate}T00:00:00`,
                endDate: `${endDate}T23:59:59`,
            },
        });
        console.log("Successfully fetched product statistics for [", creatorId, "]");
        console.log(result.data);
        return result.data;
    } catch (error: any) {
        if (error.config) {
            const { baseURL, url, params } = error.config;
            const fullURL = `${baseURL || ""}${url}?${new URLSearchParams(params).toString()}`;
            console.error("Failed URL:", fullURL);
        }
        console.error("Failed to fetch product statistics:", error.message);
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
    } catch (error: any) {
        if (error.config) {
            const { baseURL, url, params } = error.config;
            const fullURL = `${baseURL || ""}${url}?${new URLSearchParams(params).toString()}`;
            console.error("Failed URL:", fullURL);
        }
        console.error("Failed to fetch refund and cancel statistics:", error.message);
        throw new Error("Unable to retrieve refund and cancel statistics. Please try again later.");
    }
};