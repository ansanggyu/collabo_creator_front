import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const MyPage = lazy(() => import("../pages/settings/MyPage.tsx"));

const settingsRouter = {
    path: "/settings",
    children: [
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
