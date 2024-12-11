import {IUserCategory} from "../../types/iproduct.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = 'api/product';

export const getCategoriesByCreator = async (creatorId: string): Promise<IUserCategory[]> => {
    try {
        const result = await jwtAxios.get<IUserCategory[]>(`${host}/usercategory`, {
            params: { creatorId },
        });
        console.log("successed in getting category with", creatorId)
        return result.data;
    } catch (error) {
        console.error("Failed to fetch categories by creator:", error);
        throw new Error("Unable to retrieve categories. Please try again later.");
    }
};

export const addCategory = async (creatorId: string, categoryName: string): Promise<IUserCategory> => {
    try {
        const result = await jwtAxios.post<IUserCategory>(
            `${host}/addusercategory`,
            { categoryName },
            { params: { creatorId } }
        );
        console.log("Successfully added category:", result.data);
        return result.data;
    } catch (error) {
        console.error("Failed to add category:", error);
        throw new Error("Unable to add category. Please try again later.");
    }
};