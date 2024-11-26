function ReviewListComponent() {
    const reviews = [
        { id: 1, productName: "상품 1", rating: 4, comment: "좋아요!" },
        { id: 2, productName: "상품 2", rating: 5, comment: "아주 만족합니다." },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Review List</h1>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id} className="p-4 border-b">
                        <h2>상품명: {review.productName}</h2>
                        <p>평점: {review.rating}</p>
                        <p>리뷰: {review.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReviewListComponent;
