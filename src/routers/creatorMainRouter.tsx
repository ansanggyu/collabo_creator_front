import {createBrowserRouter, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import OfflineManagementRouter from "./offlineManagementRouter.tsx";
import AnalyticsRouter from "./analyticsRouter.tsx";
import CategoryRouter from "./categoryRouter.tsx";
import DashboardRouter from "./dashboardRouter.tsx";
import OrderRouter from "./orderRouter.tsx";
import ProductRouter from "./productRouter.tsx";
import ReviewRouter from "./reviewRouter.tsx";
import SettingsRouter from "./settingsRouter.tsx";
import QnaRouter from "./qnaRouter.tsx";

const LoadingPage = lazy(() => import("../pages/common/LoadingPage.tsx"))
const CreatorMainPage = lazy(()=> import("../pages/mainpage/CreatorMainPage.tsx"))
const CreatorLoginPage = lazy(()=> import("../pages/loginpage/CreatorLoginPage.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const creatorMainRouter = createBrowserRouter([
    {
        path:"/main",
        element: <Suspense fallback={Loading}><CreatorMainPage></CreatorMainPage></Suspense>
    },
    {
        path:"/",
        element: <Navigate to="login" replace={true}></Navigate>
    },
    {
        path:"/login",
        element: <Suspense fallback={Loading}><CreatorLoginPage></CreatorLoginPage></Suspense>
    },
    OfflineManagementRouter,
    AnalyticsRouter,
    CategoryRouter,
    DashboardRouter,
    OrderRouter,
    ProductRouter,
    ReviewRouter,
    SettingsRouter,
    QnaRouter,
])

export default creatorMainRouter