import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const AddCategoryPage = lazy(() => import("../pages/category/AddCategoryPage"));
const CategoryListPage = lazy(() => import("../pages/category/CategoryListPage"));

const categoryRouter = {
    path: "/category",
    children: [
        {
            path: "add",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <AddCategoryPage />
                </Suspense>
            ),
        },
        {
            path: "list",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <CategoryListPage />
                </Suspense>
            ),
        },
    ],
};

export default categoryRouter;
