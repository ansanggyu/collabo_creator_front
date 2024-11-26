import { lazy, Suspense } from "react";
import LoadingPage from "../pages/common/LoadingPage.tsx";

const OfflineBlogPage = lazy(() => import("../pages/offlinemanagement/OfflineManagementPage.tsx"));
const OfflineStoreDetailPage = lazy(() => import("../pages/offlinemanagement/OfflineManagementDetailPage.tsx"));

const OfflineManagementRouter = {
    path: "/offlinestore",
    children: [
        {
            path: "",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <OfflineBlogPage />
                </Suspense>
            ),
        },
        {
            path: ":id",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <OfflineStoreDetailPage />
                </Suspense>
            ),
        },
    ],
};

export default OfflineManagementRouter;
