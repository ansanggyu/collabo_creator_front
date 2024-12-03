import BasicLayout from "../../layouts/BasicLayout.tsx";
import OfflineStoreAddComponent from "../../components/offlinemanagement/OfflineStoreAddComponent.tsx";

function OfflineStoreAddPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <OfflineStoreAddComponent />
            </div>
        </BasicLayout>
    );
}

export default OfflineStoreAddPage;
