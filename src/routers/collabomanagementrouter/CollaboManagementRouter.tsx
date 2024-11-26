import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import LoadingPage from "../../pages/common/LoadingPage.tsx";
import ProfileSettingsRouter from "./profilesettingrouter/ProfileSettingsRouter.tsx";
import CreatorBoardRouter from "./creatorboardrouter/CreatorBoardRouter.tsx";
import ProductManagementRouter from "./productmanagementrouter/ProductManagementRouter.tsx";
import StatisticsRouter from "./statistics/StatisticsRouter.tsx";
import QnARouter from "./qnarouter/QnARouter.tsx";

const CollaboManagementIndex = lazy(()=> import("../../pages/collabomanagement/CollaboManagementIndex.tsx"))
export const Loading = <LoadingPage/>

const CollaboManagementRouter = {
    path: "/collabomanage",
    element: <Suspense fallback={Loading}><CollaboManagementIndex /></Suspense>,  // 메인 페이지
    children: [
        {
            path: "",
            element: <Navigate to="board" replace={true} />,  // 기본 경로는 'board'로 리다이렉트
        },
        ProfileSettingsRouter,
        CreatorBoardRouter,
        ProductManagementRouter,
        QnARouter,
        StatisticsRouter
    ],
};

export default CollaboManagementRouter;