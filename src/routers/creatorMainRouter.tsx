import {createBrowserRouter, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import CollaboManagementRouter from "./collabomanagementrouter/CollaboManagementRouter.tsx";
import OfflineManagementRouter from "./offlinemanagementrouter/OfflineManagementRouter.tsx";

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
    CollaboManagementRouter,
    OfflineManagementRouter
])

export default creatorMainRouter