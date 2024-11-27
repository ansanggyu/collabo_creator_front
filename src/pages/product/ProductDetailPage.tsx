import ProductDetailComponent from "../../components/product/ProductDetailComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function ProductDetailPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <ProductDetailComponent/>
            </div>
        </BasicLayout>
    );
}

export default ProductDetailPage;
