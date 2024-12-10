import jwtAxios from "../../util/jwtUtil.ts";
import { IPageResponse } from "../../types/ipageresponse.ts";
import { IReview } from "../../types/ireview.ts";

const host = `${import.meta.env.VITE_HOST_IP}`+'/review';

export const getReviewList = async (
    page?: number,
    size?: number,
    creatorId?: string
): Promise<IPageResponse<IReview>> => {
    const pageValue: number = page || 1;
    const sizeValue: number = size || 10;

    const res = await jwtAxios.get<IPageResponse<IReview>>(`${host}/list`, {
        params: { page: pageValue, size: sizeValue, creatorId },
    });

    return res.data;
};

export const addReviewReply = async (reviewNo: number, reply: string): Promise<void> => {
    try {
        await jwtAxios.put(`${host}/${reviewNo}/reply`, { reply });
    } catch (error) {
        console.error("Failed to add reply to review:", error);
        throw error;
    }
};
