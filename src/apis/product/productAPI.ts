import {IPageResponse} from "../../types/ipageresponse.ts";
import {IProduct, IProductRequest, IUserCategory} from "../../types/iproduct.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = 'http://localhost:8080/api/product';

export const addProduct = async (productData: IProductRequest): Promise<void> => {
    const result = await jwtAxios.post(`${host}/add`, productData, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    console.log("Response status:", result.status);
    console.log("Response data:", result.data);

    if (result.status !== 200) {
        throw new Error("Failed to add product");
    }
};

export const getCategoriesByCreator = async (creatorId: string): Promise<IUserCategory[]> => {
    try {
        const result = await jwtAxios.get(`${host}/usercategory`, {
            params: { creatorId },
        });
        console.log("successed in getting category with", creatorId)
        return result.data;
    } catch (error: any) {
        console.error("Failed to fetch categories by creator:", error.message);
        throw new Error("Unable to retrieve categories. Please try again later.");
    }
};

export const getProductList = async (
    page: number,
    size: number,
    creatorId: string,
    searchQuery?: string,
    selectedStatus?: string,
    selectedCategory?: number
): Promise<IPageResponse<IProduct>> => {
    const params: any = {
        page: page || 1,
        size: size || 10,
        creatorId,
    };

    if (searchQuery) params.searchQuery = searchQuery.trim();
    if (selectedStatus && selectedStatus !== "전체") params.status = selectedStatus;
    if (selectedCategory !== null && selectedCategory !== undefined) params.categoryNo = selectedCategory;

    const res = await jwtAxios.get(`${host}/list`, { params });

    return res.data;
};

export const getProductOne = async (productNo:number): Promise<IProduct> => {

    const result = await jwtAxios.get(`${host}/read/${productNo}`);

    return result.data;
}

export const updateProduct = async (creatorId: string, product: IProduct): Promise<void> => {
    const { productNo, ...productData } = product; // Extract productNo for URL
    const response = await jwtAxios.put(
        `${host}/modify/${productNo}`,
        productData,
        {
            params: { creatorId },
            headers: { "Content-Type": "application/json" },
        }
    );

    if (response.status !== 200) {
        throw new Error("Failed to update product");
    }
};