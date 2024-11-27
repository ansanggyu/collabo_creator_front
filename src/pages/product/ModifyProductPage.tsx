import ModifyProductComponent from "../../components/product/ModifyProductComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function ModifyProductPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <ModifyProductComponent/>
            </div>
        </BasicLayout>
    );
}

export default ModifyProductPage;
