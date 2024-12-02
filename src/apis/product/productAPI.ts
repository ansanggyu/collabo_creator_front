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

    if (result.status !== 201) {
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
): Promise<IPageResponse<IProduct>> => {
    const pageValue: number = page || 1;
    const sizeValue: number = size || 10;

    const res = await jwtAxios.get(`${host}/list`, {
        params: { page: pageValue, size: sizeValue, creatorId },
    });

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