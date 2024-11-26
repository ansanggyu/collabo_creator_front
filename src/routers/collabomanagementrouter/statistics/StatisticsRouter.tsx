import {lazy, Suspense} from "react";


const Loading = lazy(()=> import("../../../pages/common/LoadingPage.tsx"))
const StatisticsPage = lazy(()=> import("../../../pages/collabomanagement/statistics/StatisticsPage.tsx"))

const StatisticsRouter = {
    path: "statistics",
    element: <Suspense fallback={Loading}><StatisticsPage/></Suspense>,  // 메인 페이지
};

export default StatisticsRouter;