import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));

const dashboardRouter = {
    path: "/",
    element: (
        <Suspense fallback={<LoadingPage />}>
            <DashboardPage />
        </Suspense>
    ),
};

export default dashboardRouter;
