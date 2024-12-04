import {IUserCategory} from "../../types/iproduct.ts";
import jwtAxios from "../../util/jwtUtil.ts";
import axios from "axios";

const host = 'http://localhost:8080/api/product';

export const getCategoriesByCreator = async (creatorId: string): Promise<IUserCategory[]> => {
    try {
        const result = await jwtAxios.get(`${host}/usercategory`, {
            params: { creatorId },
        });
        console.log("successed in getting category with", creatorId)
        return result.data;
    } catch (error) {
        console.error("Failed to fetch categories by creator:", axios.isAxiosError(error));
        throw new Error("Unable to retrieve categories. Please try again later.");
    }
};

export const addCategory = async (creatorId: string, categoryName: string): Promise<IUserCategory> => {
    try {
        const result = await jwtAxios.post(
            `${host}/addusercategory`,
            { categoryName },
            { params: { creatorId } }
        );
        console.log("Successfully added category:", result.data);
        return result.data;
    } catch (error) {
        console.error("Failed to add category:", axios.isAxiosError(error));
        throw new Error("Unable to add category. Please try again later.");
    }
};