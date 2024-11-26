import BasicLayout from "../../layouts/BasicLayout.tsx";
import InventoryComponent from "../../components/product/InventoryComponent.tsx";

function InventoryPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <InventoryComponent />
            </div>
        </BasicLayout>
    );
}

export default InventoryPage;
