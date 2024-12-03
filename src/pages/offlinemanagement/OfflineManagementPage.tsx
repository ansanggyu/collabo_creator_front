import OfflineManagement from "../../components/offlinemanagement/OfflineManagementComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function OfflineBlogPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <OfflineManagement/>
            </div>
        </BasicLayout>
    );
}

export default OfflineBlogPage;
