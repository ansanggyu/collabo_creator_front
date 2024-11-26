import SalesGraphComponent from "../../components/analytics/SalesGraphComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function SalesGraphPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <SalesGraphComponent />
            </div>
        </BasicLayout>
    );
}

export default SalesGraphPage;
