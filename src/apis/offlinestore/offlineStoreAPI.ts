import jwtAxios from "../../util/jwtUtil.ts";
import { IOfflineStore } from "../../types/iofflinestore.ts";

const host = 'http://localhost:8080/api/offlinestore';

export const getOfflineStoreList = async (creatorId: string): Promise<IOfflineStore[]> => {
    try {
        const result = await jwtAxios.get<IOfflineStore[]>(`${host}/list`, {
            params: { creatorId },
        })
        return result.data;
    } catch (error) {
        console.error("Failed to fetch stores by creator:", error);
        throw new Error("Unable to retrieve stores. Please try again later.");
    }
};

export const registerOfflineStore = async (
    creatorId: string,
    storeData: Partial<IOfflineStore> // IOfflineStore에 맞는 데이터를 Partial로 정의
): Promise<number> => {
    try {
        const result = await jwtAxios.post<number>(`${host}/add`, storeData, {
            params: { creatorId },
            headers: { "Content-Type": "application/json" }, // JSON 데이터로 Content-Type 설정
        });
        return result.data; // 등록된 매장의 ID 반환
    } catch (error) {
        console.error("Failed to register offline store:", error);
        throw new Error("Unable to register store. Please try again later.");
    }
};

export const updateOfflineStore = async (
    storeNo: number,
    storeData: Partial<IOfflineStore>
): Promise<number> => {
    try {
        const response = await jwtAxios.put<number>(`${host}/update/${storeNo}`, storeData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data; // 수정된 매장의 ID 반환
    } catch (error) {
        console.error("Failed to update offline store:", error);
        throw new Error("Unable to update store. Please try again later.");
    }
};

export const deleteOfflineStore = async (storeNo: number): Promise<void> => {
    try {
        await jwtAxios.delete(`${host}/delete/${storeNo}`);
    } catch (error) {
        console.error("Failed to delete offline store:", error);
        throw new Error("Unable to delete store. Please try again later.");
    }
};