import BasicLayout from "../../layouts/BasicLayout.tsx";
import ReviewDetailComponent from "../../components/review/ReviewDetailComponent.tsx";

function ReviewListPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <ReviewDetailComponent />
            </div>
        </BasicLayout>
    );
}

export default ReviewListPage;
