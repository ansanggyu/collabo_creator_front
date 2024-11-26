import DashboardComponent from "../../components/dashboard/DashboardComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function DashboardPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <DashboardComponent />
            </div>
        </BasicLayout>
    );
}

export default DashboardPage;
