import ProductListComponent from "../../components/product/ProductListComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function ProductListPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <ProductListComponent />
            </div>
        </BasicLayout>
    );
}

export default ProductListPage;
