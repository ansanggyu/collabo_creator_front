import AddProductComponent from "../../components/product/AddProductComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function AddProductPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <AddProductComponent />
            </div>
        </BasicLayout>
    );
}

export default AddProductPage;
