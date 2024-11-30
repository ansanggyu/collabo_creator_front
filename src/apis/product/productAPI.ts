import {IPageResponse} from "../../types/ipageresponse.ts";
import {IProduct, IProductRequest, IUserCategory} from "../../types/iproduct.ts";
import axios from "axios";

const host = 'http://localhost:8080/api/product';

export const addProduct = async (productData: IProductRequest): Promise<void> => {
    const result = await axios.post(`${host}/add`, productData, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (result.status !== 201) {
        throw new Error("Failed to add product");
    }
};

export const getCategoriesByCreator = async (creatorId: string): Promise<IUserCategory[]> => {
    const result = await axios.get(`${host}/usercategory`, {
        params: { creatorId },
    });
    return result.data;
};

export const getProductList = async (page?:number, size?:number): Promise<IPageResponse<IProduct>> => {

    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const result = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)

    return result.data;
}

export const getProductOne = async (productNo:number): Promise<IProduct> => {

    const result = await axios.get(`${host}/read/${productNo}`);

    return result.data;
}

// 상품 검색
export const searchProduct = async (page?:number, size?:number, productName?: string, startDate ?:string, endDate ?: string ): Promise<IPageResponse<IProduct>> => {

    const params = {page: String(page), size: String(size), productName, startDate, endDate}

    const result = await axios.get(`${host}/search`, {params})
    return result.data;
}