import { useState } from "react";
import { useParams } from "react-router-dom";

const mockReviews = {
    1: {
        product: "튼튼하고 사이즈 좋아요",
        rating: 5,
        comment: "튼튼하고 사이즈가 딱 좋아요! 많이 사용하진 않았지만 예쁘고 좋아요.",
    },
    2: {
        product: "좋아요~~~~~",
        rating: 5,
        comment: "사용해보니 정말 좋아요! 추천합니다.",
    },
};

function ReviewDetailComponent() {
    const { id } = useParams();
    const [reply, setReply] = useState("");

    const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReply(e.target.value);
    };

    const handleSubmitReply = (e: React.FormEvent) => {
        e.preventDefault();
        alert("답변이 등록되었습니다.");
        // API 호출로 답변 등록 처리
    };

    const review = mockReviews[id || 1];

    return (
        <div className="review-detail p-4">
            <h1 className="text-xl font-bold mb-4">리뷰 상세 - #{id}</h1>
            <div className="mb-4 border p-4 rounded">
                <div className="mb-2 font-bold text-lg">{review.product}</div>
                <div className="text-gray-600">평점: ⭐ {review.rating}</div>
                <div className="text-gray-800 mt-2">내용: {review.comment}</div>
            </div>
            <div className="mb-4">
                <label>답변:</label>
                <input
                    type="text"
                    value={reply}
                    onChange={handleReplyChange}
                    placeholder="답변을 입력하세요"
                    className="border p-2 w-full mt-2"
                />
            </div>
            <button
                onClick={handleSubmitReply}
                className="bg-blue-500 text-white p-2 rounded"
            >
                답변 등록
            </button>
        </div>
    );
}

export default ReviewDetailComponent;
