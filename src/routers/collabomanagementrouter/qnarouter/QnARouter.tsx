import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const Loading = lazy(()=> import("../../../pages/common/LoadingPage.tsx"))
const QnAPage = lazy(()=> import("../../../pages/collabomanagement/qna/QnAPage.tsx"))
const QnAReadPage = lazy(()=> import("../../../pages/collabomanagement/qna/QnAReadPage.tsx"))

const QnARouter = {
    path: "qna",
    element: <Suspense fallback={Loading}><QnAPage/></Suspense>,  // 메인 페이지
    children: [
        {
            path: "",
            element: <Navigate to="." replace={true}></Navigate>
        },
        {
            path: "read/:no",
            element: <Suspense fallback={Loading}><QnAReadPage/></Suspense>
        }
    ],
};

export default QnARouter;