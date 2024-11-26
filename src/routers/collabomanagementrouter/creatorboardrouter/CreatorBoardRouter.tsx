import {lazy, Suspense} from "react";

const CreatorBoardPage = lazy(()=> import("../../../pages/collabomanagement/creatorboard/CreatorBoardPage.tsx"))
const CreatorBoardReadPage = lazy(() => import("../../../pages/collabomanagement/creatorboard/CreatorBoardReadPage.tsx"))
import {Navigate} from "react-router-dom";
import LoadingPage from "../../../pages/common/LoadingPage.tsx";

export const Loading = <LoadingPage/>

const CreatorBoardRouter = {
    path: 'board',
    element: <Suspense fallback={Loading}><CreatorBoardPage></CreatorBoardPage></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to="." replace={true}></Navigate>
        },
        {
            path: "read/:no",
            element: <Suspense fallback={Loading}><CreatorBoardReadPage/></Suspense>
        }
    ]

};

export default CreatorBoardRouter;