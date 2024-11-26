import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const ReviewListPage = lazy(() => import("../pages/review/ReviewListPage"));
const ReviewDetailPage = lazy(() => import("../pages/review/ReviewDetailPage"));

const reviewRouter = {
    path: "/review",
    children: [
        {
            path: "list",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <ReviewListPage />
                </Suspense>
            ),
        },
        {
            path: "detail/:id",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <ReviewDetailPage />
                </Suspense>
            ),
        },
    ],
};

export default reviewRouter;
