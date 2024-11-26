import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";
import InventoryPage from "../pages/product/InventoryPage.tsx";

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
