import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { addReviewReply, getReviewList } from "../../apis/review/reviewAPI";
import { IReview } from "../../types/ireview";
import PageComponent from "../common/PageComponent";
import { IPageResponse } from "../../types/ipageresponse.ts";
import Cookies from "js-cookie";

function ReviewListComponent() {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [pageInfo, setPageInfo] = useState<IPageResponse<IReview> | null>(null);
    const [reply, setReply] = useState<string>(""); // 답변 텍스트 상태
    const [selectedReview, setSelectedReview] = useState<number | null>(null); // 선택된 리뷰 번호
    const [creatorId, setCreatorId] = useState<string | null>(null); // 쿠키에서 가져온 creatorId
    const [query] = useSearchParams(); // useSearchParams로 쿼리 파라미터 사용
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지

    // 쿠키에서 creatorId 가져오기
    useEffect(() => {
        const cookieCreatorLogin = Cookies.get("creatorlogin");
        if (!cookieCreatorLogin) {
            alert("creatorId 쿠키가 없습니다. 접근이 제한됩니다.");
            throw new Error("쿠키에서 creatorId를 가져올 수 없습니다.");
        }

        try {
            const parsedCookie = JSON.parse(cookieCreatorLogin); // 쿠키 데이터를 JSON으로 변환
            if (parsedCookie.creatorId) {
                setCreatorId(parsedCookie.creatorId);
            } else {
                throw new Error("쿠키에서 creatorId가 없습니다.");
            }
        } catch (error) {
            console.error("쿠키 파싱 중 오류 발생:", error);
            alert("쿠키 데이터를 확인할 수 없습니다.");
        }
    }, []);

    // 리뷰 목록을 불러오는 함수
    const fetchReviews = async (page: number) => {
        if (!creatorId) return; // creatorId가 없으면 실행하지 않음
        try {
            const data = await getReviewList(page, 10, creatorId); // creatorId 전달
            setReviews(data.dtoList);
            setPageInfo(data);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
    };

    // 리뷰 답변을 추가/수정하는 함수
    const handleReplySubmit = async () => {
        if (selectedReview && reply.trim()) {
            try {
                await addReviewReply(selectedReview, reply);
                alert("답변이 처리되었습니다.");
                setReply("");
                setSelectedReview(null);
                fetchReviews(currentPage); // 답변 후 리뷰 목록 갱신
            } catch (error) {
                console.error("Failed to add or update reply:", error);
                alert("답변 처리에 실패했습니다.");
            }
        } else {
            alert("답변 내용을 입력해주세요.");
        }
    };

    useEffect(() => {
        const page = Number(query.get("page")) || 1;
        setCurrentPage(page); // 쿼리에서 `page` 값을 가져와서 상태 업데이트
        fetchReviews(page); // 페이지가 변경될 때마다 리뷰 목록 갱신
    }, [query, creatorId]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">리뷰 리스트</h1>
            <ul className="space-y-4">
                {reviews.map((review) => (
                    <li key={review.reviewNo} className="bg-white p-4 rounded-lg shadow">
                        <div>
                            <h2 className="text-lg font-bold">{review.productName}</h2>
                            <p className="text-sm text-gray-600">{review.productDescription}</p>
                            <p className="text-sm text-gray-500">
                                작성자: {review.customerName} / 평점:{" "}
                                <span className="text-yellow-500">
                                    {"⭐".repeat(review.rating)}
                                </span>
                            </p>
                            <p className="text-sm text-gray-400">작성일: {review.createdAt}</p>
                            <p className="mt-2">{review.comment}</p>
                        </div>

                        {/* 리뷰 이미지 - 리뷰 내용 아래에 배치 */}
                        {review.reviewImages.length > 0 && (
                            <div className="mt-4 flex space-x-2">
                                {review.reviewImages.map((image) => (
                                    <img
                                        key={image.reviewImageNo}
                                        src={image.reviewImageUrl}
                                        alt="리뷰 이미지"
                                        className="w-32 h-32 rounded object-cover"
                                    />
                                ))}
                            </div>
                        )}

                        {/* 판매자 답변 - 이미지 밑에 배치 */}
                        {selectedReview === review.reviewNo ? (
                            <div className="mt-4">
                                <textarea
                                    className="w-full p-2 border rounded resize-none"
                                    rows={3}
                                    placeholder="답변을 입력하세요"
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                ></textarea>
                                <div className="mt-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={handleReplySubmit}
                                    >
                                        수정완료
                                    </button>
                                    <button
                                        className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                        onClick={() => {
                                            setSelectedReview(null);
                                            setReply("");
                                        }}
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 p-2 bg-gray-100 border rounded">
                                <span className="text-blue-500 font-bold">판매자 답변:</span>{" "}
                                {review.reply}
                                <button
                                    className="ml-2 text-sm text-blue-500"
                                    onClick={() => {
                                        setSelectedReview(review.reviewNo);
                                        setReply(review.reply || ""); // 기존 답변 내용을 입력창에 표시
                                    }}
                                >
                                    수정하기
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            {pageInfo && (
                <PageComponent
                    pageResponse={pageInfo} // 페이지 컴포넌트에 `pageInfo` 전달
                />
            )}
        </div>
    );
}

export default ReviewListComponent;
