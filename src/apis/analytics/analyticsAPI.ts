import { ICreatorAnalytics } from "../../types/iproduct.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = "http://localhost:8080/api/statistics";

export const getCreatorAnalytics = async (
    creatorId: string,
    startDate: string,
    endDate: string
): Promise<ICreatorAnalytics[]> => {
    try {
        const result = await jwtAxios.get(`${host}`, {
            params: {
                creatorId,
                startDate: `${startDate}T00:00:00`,
                endDate: `${endDate}T23:59:59`,
            },
        });
        console.log("Successfully fetched analytics for", creatorId);
        console.log(result.data)
        return result.data;
    } catch (error: any) {
        if (error.config) {
            const { baseURL, url, params } = error.config;
            const fullURL = `${baseURL || ""}${url}?${new URLSearchParams(params).toString()}`;
            console.error("Failed URL:", fullURL);
        }
        console.error("Failed to fetch analytics:", error.message);
        throw new Error("Unable to retrieve analytics. Please try again later.");
    }
};