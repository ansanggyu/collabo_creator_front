import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage";

const QnAListPage = lazy(() => import("../pages/qna/QnAListPage.tsx"))
const QnADetailPage = lazy(() => import("../pages/qna/QnADetailPage.tsx"))

const reviewRouter = {
    path: "/qna",
    children: [
        {
            path: "list",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <QnAListPage />
                </Suspense>
            ),
        },
        {
            path: "detail/:id",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <QnADetailPage />
                </Suspense>
            ),
        },
    ],
};

export default reviewRouter;
