
import { lazy, Suspense } from 'react';
import LoadingPage from "../../../pages/common/LoadingPage.tsx";



const ProfileSettingsPage = lazy(() => import("../../../pages/collabomanagement/profilesetting/ProfileSettingPage.tsx"));

export const Loading = <LoadingPage/>

const ProfileSettingsRouter = {
    path: "profile",
    element: <Suspense fallback={Loading}><ProfileSettingsPage /></Suspense>,
};

export default ProfileSettingsRouter;