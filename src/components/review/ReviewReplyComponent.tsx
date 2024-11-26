function ReviewReplyComponent({ reviewId }: { reviewId: string }) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Review Reply</h1>
            <p>리뷰 ID: {reviewId}</p>
            <textarea className="border rounded p-2 w-full" placeholder="답변을 입력하세요"></textarea>
            <button className="bg-blue-500 text-white p-2 rounded mt-2">답변 작성</button>
        </div>
    );
}

export default ReviewReplyComponent;
