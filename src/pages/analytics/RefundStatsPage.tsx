import RefundStatsComponent from "../../components/analytics/RefundStatsComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function RefundStatsPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <RefundStatsComponent/>
            </div>
        </BasicLayout>
    );
}

export default RefundStatsPage;
