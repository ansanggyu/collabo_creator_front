import jwtAxios from "../../util/jwtUtil.ts";

const host = "http://localhost:8080/api/images";

export const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
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
