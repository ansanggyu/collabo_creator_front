import { lazy, Suspense } from "react";

const LoadingPage = lazy(() => import("../pages/common/LoadingPage.tsx"));
const OfflineBlogPage = lazy(() => import("../pages/offlinemanagement/OfflineManagementPage.tsx"));
const OfflineStoreAddPage = lazy(() => import("../pages/offlinemanagement/OfflineStoreAddPage.tsx"));
const OfflineStoreEditPage = lazy(() => import("../pages/offlinemanagement/OfflineStoreEditPage.tsx"));

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
            path: "add",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <OfflineStoreAddPage />
                </Suspense>
            ),
        },
        {
            path: "edit/:storeNo",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <OfflineStoreEditPage />
                </Suspense>
            ),
        }
    ],
};

export default OfflineManagementRouter;
