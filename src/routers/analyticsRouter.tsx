import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const SalesGraphPage = lazy(() => import("../pages/analytics/SalesGraphPage"));
const ProductStatsPage = lazy(() => import("../pages/analytics/ProductStatsPage"));

const analyticsRouter = {
    path: "/analytics",
    children: [
        {
            path: "sales",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <SalesGraphPage />
                </Suspense>
            ),
        },
        {
            path: "products",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <ProductStatsPage />
                </Suspense>
            ),
        },
    ],
};

export default analyticsRouter;
