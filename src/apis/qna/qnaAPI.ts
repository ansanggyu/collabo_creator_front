import jwtAxios from "../../util/jwtUtil.ts";
import { IPageResponse } from "../../types/ipageresponse.ts";
import { IQnA } from "../../types/iqna.ts";

const host = `${import.meta.env.HOST_IP}`+'/qna';

export const getQnAList = async (
    page?: number,
    size?: number,
    creatorId?: string
): Promise<IPageResponse<IQnA>> => {
    const pageValue: number = page || 1;
    const sizeValue: number = size || 10;

    const res = await jwtAxios.get<IPageResponse<IQnA>>(`${host}/list`, {
        params: { page: pageValue, size: sizeValue, creatorId },
    });

    return res.data;
};

export const addQnAAnswer = async (qnaNo: number, answer: string): Promise<void> => {
    try {
        await jwtAxios.put(`${host}/${qnaNo}/answer`, { answer });
    } catch (error) {
        console.error("Failed to add answer to review:", error);
        throw error;
    }
};
