import {configureStore} from "@reduxjs/toolkit";
import signinSlice from "./slices/signinSlice.ts";

const projectStore = configureStore({
    reducer: {
        signin: signinSlice
    }
});

export type RootState = ReturnType<typeof projectStore.getState>

export type AppDispatch = typeof projectStore.dispatch

export default projectStore