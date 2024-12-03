import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const ReviewListPage = lazy(() => import("../pages/review/ReviewListPage"));

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
    ],
};

export default reviewRouter;
