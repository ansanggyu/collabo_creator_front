import BasicLayout from "../../layouts/BasicLayout.tsx";
import DashboardComponent from "../../components/dashboard/DashboardComponent.tsx";

function AdminMainPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <DashboardComponent />
            </div>
        </BasicLayout>
    );
}

export default AdminMainPage;