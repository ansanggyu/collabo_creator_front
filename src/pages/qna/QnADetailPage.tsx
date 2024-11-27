import QnADetailComponent from "../../components/qna/QnADetailComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function QnADetailPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <QnADetailComponent/>
            </div>
        </BasicLayout>
    );
}

export default QnADetailPage;
