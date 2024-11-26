import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import creatorMainRouter from "./routers/creatorMainRouter.tsx";
import projectStore from "./store.ts";
import {Provider} from "react-redux";


createRoot(document.getElementById('root')!).render(
    <Provider store={projectStore}>
        <RouterProvider router={creatorMainRouter}></RouterProvider>
    </Provider>
)
