import './index.css'
import {RouterProvider} from "react-router-dom";
import creatorMainRouter from "./routers/creatorMainRouter.tsx";
import useRestoreState from "./hooks/useRestoreState.ts";

function App() {
    useRestoreState();

  return (
    <>
      <RouterProvider router={creatorMainRouter}/>
    </>
  )
}

export default App
