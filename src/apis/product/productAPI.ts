import jwtAxios from "../../util/jwtUtil.ts";
import axios from "axios";
import { IPageResponse } from "../../types/ipageresponse.ts";
import { IProduct, IProductRequest } from "../../types/iproduct.ts";

const host = 'http://localhost:8080/api/product';

export const productImageUpload = async (
    productNo: number,
    imageDTOs: { productImageUrl: string; productImageOrd: number }[]
): Promise<{ productImageUrl: string; productImageOrd: number }[]> => {
    try {
        const result = await jwtAxios.post(`${host}/img`, imageDTOs, {
            params: { productNo },
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (result.status !== 200) {
            throw new Error("Failed to upload product images");
        }

        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error.message);
            console.error("Axios Response:", error.response?.data);
        } else {
            console.error("Unexpected Error:", error);
        }
        throw new Error("An error occurred while uploading the product images.");
    }
};

export const productImageDelete = async (imageId: number): Promise<void> => {
    try {
        const result = await jwtAxios.delete(`${host}/img/${imageId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (result.status !== 200) {
            throw new Error("Failed to delete product image");
        }

        console.log(`Image with ID ${imageId} successfully deleted.`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error.message);
            console.error("Axios Response:", error.response?.data);
        } else {
            console.error("Unexpected Error:", error);
        }
        throw new Error("An error occurred while deleting the product image.");
    }
};



export const addProduct = async (productData: IProductRequest): Promise<void> => {
    try {
        const result = await jwtAxios.post(`${host}/add`, productData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (result.status !== 200) {
            throw new Error("Failed to add product");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error.message);
            console.error("Axios Response:", error.response?.data);
        } else {
            console.error("Unexpected Error:", error);
        }
        throw new Error("An error occurred while adding the product.");
    }
};

// 상품 목록 가져오기
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

// 특정 상품 가져오기
export const getProductOne = async (productNo: number): Promise<IProduct | null> => {
    try {
        const response = await jwtAxios.get(`${host}/read/${productNo}`);
        const data = response.data;

        // 다중 이미지 처리를 위해 이미지 데이터를 변환
        const productImages = data.productImages.map((image: { productImageUrl: string; productImageOrd: number }) => ({
            productImageUrl: image.productImageUrl,
            productImageOrd: image.productImageOrd,
        }));

        return {
            ...data,
            productImages, // 이미지 배열 추가
        };
    } catch (error) {
        console.error("Failed to fetch product details:", error);
        return null; // 실패한 경우 null 반환
    }
};

// 상품 업데이트
export const updateProduct = async (creatorId: string, product: IProductRequest): Promise<void> => {
    const { productImages, ...productData } = product; // Extract productImages for payload

    try {
        const response = await jwtAxios.put<void>(
            `${host}/modify/${productData.productNo}`, // Use productNo in URL
            {
                ...productData,
                productImages, // Include productImages in request body
            },
            {
                params: { creatorId },
                headers: { "Content-Type": "application/json" },
            }
        );

        if (response.status !== 200) {
            throw new Error("Failed to update product");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error.message);
            console.error("Axios Response:", error.response?.data);
        } else {
            console.error("Unexpected Error:", error);
        }
        throw new Error("An error occurred while updating the product.");
    }
};
