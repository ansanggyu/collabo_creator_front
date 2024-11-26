import AddCategoryComponent from "../../components/category/AddCategoryComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function AddCategoryPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <AddCategoryComponent />
            </div>
        </BasicLayout>
    );
}

export default AddCategoryPage;
