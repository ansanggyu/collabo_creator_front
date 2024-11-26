import ReviewListComponent from "../../components/review/ReviewListComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function ReviewListPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <ReviewListComponent />
            </div>
        </BasicLayout>
    );
}

export default ReviewListPage;
