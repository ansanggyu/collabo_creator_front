import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage";

const OrderListPage = lazy(() => import("../pages/order/OrderListPage"));
const OrderDetailPage = lazy(() => import("../pages/order/OrderDetailPage"));

const orderRouter = {
    path: "/order",
    children: [
        {
            path: "list",
            element: (
                <Suspense fallback={<LoadingPage/>}>
                    <OrderListPage/>
                </Suspense>
            ),
        },
        {
            path: "detail",
            element: (
                <Suspense fallback={<LoadingPage/>}>
                    <OrderDetailPage/>
                </Suspense>
            ),
        },
    ],
};

export default orderRouter;
