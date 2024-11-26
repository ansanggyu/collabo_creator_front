import { lazy, Suspense } from 'react';
import LoadingPage from "../../../pages/common/LoadingPage.tsx";

export const Loading = <LoadingPage/>

const ProductManagementPage = lazy(()=> import("../../../pages/collabomanagement/productmanagement/ProductManagementPage.tsx"))


const ProductManagementRouter = {
    path: "product",
    element: <Suspense fallback={Loading}><ProductManagementPage /></Suspense>,
};

export default ProductManagementRouter;