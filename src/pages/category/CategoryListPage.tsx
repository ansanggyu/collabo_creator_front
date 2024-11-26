import CategoryListComponent from "../../components/category/CategoryListComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function CategoryListPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <CategoryListComponent />
            </div>
        </BasicLayout>
    );
}

export default CategoryListPage;
