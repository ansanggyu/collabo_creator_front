import { lazy, Suspense } from "react";
import LoadingPage from "../pages/common/LoadingPage.tsx";
import OfflineStoreAddPage from "../pages/offlinemanagement/OfflineStoreAddPage.tsx";
import OfflineStoreEditPage from "../pages/offlinemanagement/OfflineStoreEditPage.tsx";

const OfflineBlogPage = lazy(() => import("../pages/offlinemanagement/OfflineManagementPage.tsx"));

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
