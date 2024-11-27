import QnAListComponent from "../../components/qna/QnAListComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function QnAListPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <QnAListComponent/>
            </div>
        </BasicLayout>
    );
}

export default QnAListPage;
