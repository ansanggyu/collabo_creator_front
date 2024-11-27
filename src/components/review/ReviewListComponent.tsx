import { useNavigate } from "react-router-dom";

const mockReviews = [
    {
        id: 1,
        product: "튼튼하고 사이즈 좋아요",
        rating: 5,
        comment: "튼튼하고 사이즈가 딱 좋아요! 많이 사용하진 않았지만 예쁘고 좋아요.",
        likes: 12,
        sellerReply: "만족하셨다니 기쁩니다! 더 좋은 제품으로 보답하겠습니다.",
    },
    {
        id: 2,
        product: "좋아요~~~~~",
        rating: 5,
        comment: "사용해보니 정말 좋아요! 추천합니다.",
        likes: 8,
        sellerReply: "정성스러운 리뷰 감사합니다! 따뜻한 봄 보내세요~",
    },
];

function ReviewListComponent() {
    const navigate = useNavigate();

    const goToDetail = (id: number) => {
        navigate(`/review/detail/${id}`);
    };

    return (
        <div className="review-list">
            <h1 className="text-xl font-bold mb-4">리뷰 리스트</h1>
            <ul>
                {mockReviews.map((review) => (
                    <li key={review.id} className="border p-4 mb-4 rounded shadow">
                        <div className="mb-2">
                            <span className="font-bold text-lg">{review.product}</span>
                        </div>
                        <div className="text-gray-600">평점: ⭐ {review.rating}</div>
                        <div className="text-gray-800 mt-2">내용: {review.comment}</div>
                        <div className="text-sm text-gray-500 mt-1">
                            좋아요: {review.likes}
                        </div>
                        {review.sellerReply && (
                            <div className="mt-4 p-2 bg-gray-100 border rounded">
                                <span className="text-blue-500 font-bold">판매자 답변:</span>{" "}
                                {review.sellerReply}
                            </div>
                        )}
                        <button
                            className="mt-4 bg-blue-500 text-white p-2 rounded"
                            onClick={() => goToDetail(review.id)}
                        >
                            답변하기
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReviewListComponent;
