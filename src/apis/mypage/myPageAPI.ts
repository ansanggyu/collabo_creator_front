import jwtAxios from "../../util/jwtUtil";
import { ICreator } from "../../types/icreator";

const host = "http://localhost:8080/api/mypage";

export const getMyPage = async (creatorId: string): Promise<ICreator> => {
    try {
        const response = await jwtAxios.get(`${host}/${creatorId}`);
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch MyPage data:", error.message);
        throw new Error("마이페이지 데이터를 불러오는 데 실패했습니다.");
    }
};

export const updateMyPage = async (creatorId: string, creatorData: ICreator): Promise<void> => {
    try {
        await jwtAxios.put(`${host}/${creatorId}`, creatorData);
    } catch (error: any) {
        console.error("Failed to update MyPage data:", error.message);
        throw new Error("마이페이지 수정에 실패했습니다.");
    }
};
