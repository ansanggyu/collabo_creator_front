import ProductStatsComponent from "../../components/analytics/ProductStatsComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function ProductStatsPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <ProductStatsComponent />
            </div>
        </BasicLayout>
    );
}

export default ProductStatsPage;
