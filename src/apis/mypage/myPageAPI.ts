import jwtAxios from "../../util/jwtUtil";
import { ICreator } from "../../types/icreator";

const host = `${import.meta.env.VITE_HOST_IP}`+'mypage';

export const getMyPage = async (creatorId: string): Promise<ICreator> => {
    try {
        const response = await jwtAxios.get<ICreator>(`${host}`, {
            params: { creatorId }, // Query parameters로 creatorId 전달
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch MyPage data:", error);
        throw new Error("마이페이지 데이터를 불러오는 데 실패했습니다.");
    }
};

export const updateMyPage = async (creatorId: string, creatorData: Partial<ICreator>): Promise<void> => {
    try {
        await jwtAxios.put(`${host}/update`, creatorData, {
            params: { creatorId }, // Query parameters로 creatorId 전달
            headers: { "Content-Type": "application/json" }, // Content-Type 설정
        });
    } catch (error) {
        console.error("Failed to update MyPage data:", error);
        throw new Error("마이페이지 수정에 실패했습니다.");
    }
};
