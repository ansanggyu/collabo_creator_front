import { useParams } from "react-router-dom";
import ReviewReplyComponent from "../../components/review/ReviewReplyComponent";

function ReviewReplyPage() {
    const { id } = useParams();

    return (
        <div className="container mx-auto">
            <ReviewReplyComponent reviewId={id || ""} />
        </div>
    );
}

export default ReviewReplyPage;
