import DesignModeComponent from "../../components/settings/DesignModeComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function DesignModePage() {
    return (
        <BasicLayout>
            <div className="container mx-auto p-4">
                <DesignModeComponent/>
            </div>
        </BasicLayout>
    );
}

export default DesignModePage;
