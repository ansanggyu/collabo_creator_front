import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const AddProductPage = lazy(() => import("../pages/product/AddProductPage"));
const ProductListPage = lazy(() => import("../pages/product/ProductListPage"));
const ProductDetailPage = lazy(() => import("../pages/product/ProductDetailPage"));
const InventoryPage = lazy(() => import("../pages/product/InventoryPage"));
const ModifyProductPage = lazy(() => import("../pages/product/ModifyProductPage"));

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
        {
            path: "detail/:productNo",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <ProductDetailPage />
                </Suspense>
            ),
        },
        {
            path: "detail/modify/:productNo",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <ModifyProductPage />
                </Suspense>
            ),
        },
        {
            path: "inventory",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <InventoryPage />
                </Suspense>
            ),
        },
    ],
};

export default productRouter;
