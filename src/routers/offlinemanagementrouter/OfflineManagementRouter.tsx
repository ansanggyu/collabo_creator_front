import {Suspense} from "react";
import {Navigate} from "react-router-dom";
import OfflineManagementPage from "../../pages/offlinemanagement/OfflineManagementPage.tsx";
import LoadingPage from "../../pages/common/LoadingPage.tsx";

export const Loading = <LoadingPage/>

const OfflineManagementRouter = {

    path: "/offlinestore",
    element: <Suspense fallback={Loading}><OfflineManagementPage /></Suspense>,  // 메인 페이지
    children: [
        {
            path: "",
            element: <Navigate to="offlinestore" replace={true} />,
        }
    ]
}

export default OfflineManagementRouter;