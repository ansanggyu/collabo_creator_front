import BasicLayout from "../../layouts/BasicLayout.tsx";
import OfflineStoreEditComponent from "../../components/offlinemanagement/OfflineStoreEditComponent.tsx";

function OfflineStoreAddPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <OfflineStoreEditComponent />
            </div>
        </BasicLayout>
    );
}

export default OfflineStoreAddPage;
