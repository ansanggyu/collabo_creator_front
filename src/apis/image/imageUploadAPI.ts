import jwtAxios from "../../util/jwtUtil.ts";

const host = "http://localhost:8080/api/images";

export const uploadS3Images = async (imageFiles: File[]): Promise<string[]> => {
    const formData = new FormData();
    imageFiles.forEach((file) => formData.append("imageFiles", file));

    try {
        const response = await jwtAxios.post(`${host}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // 업로드된 이미지 URL 리스트 반환
    } catch (error: any) {
        console.error("Failed to upload images:", error.message);
        throw new Error("Unable to upload images. Please try again later.");
    }
};

export const deleteS3Image = async (imageId: number): Promise<void> => {
    try {
        await jwtAxios.delete(`${host}/${imageId}`);
        console.log(`Image with ID ${imageId} deleted successfully`);
    } catch (error: any) {
        console.error("Failed to delete image:", error.message);
        throw new Error("Unable to delete the image. Please try again later.");
    }
};