import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const AddProductPage = lazy(() => import("../pages/product/AddProductPage"));
const ProductListPage = lazy(() => import("../pages/product/ProductListPage"));

const productRouter = {
    path: "/product",
    children: [
        {
            path: "add",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <AddProductPage />
                </Suspense>
            ),
        },
        {
            path: "list",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <ProductListPage />
                </Suspense>
            ),
        },
    ],
};

export default productRouter;
