import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const DesignModePage = lazy(() => import("../pages/settings/DesignModePage.tsx"));
const MyPage = lazy(() => import("../pages/settings/MyPage.tsx"));

const settingsRouter = {
    path: "/settings",
    children: [
        {
            path: "designmode",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <DesignModePage />
                </Suspense>
            ),
        },
        {
            path: "mypage",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <MyPage />
                </Suspense>
            ),
        },
    ],
};

export default settingsRouter;
