import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { addQnAAnswer, getQnAList } from "../../apis/qna/qnaAPI"; // QnA API 호출 함수
import { IQnA } from "../../types/iqna";
import PageComponent from "../common/PageComponent";
import { IPageResponse } from "../../types/ipageresponse.ts";
import Cookies from "js-cookie";

function QnAListComponent() {
    const [qnaList, setQnAList] = useState<IQnA[]>([]); // QnA 리스트 상태
    const [pageInfo, setPageInfo] = useState<IPageResponse<IQnA> | null>(null); // 페이지 정보
    const [answer, setAnswer] = useState<string>(""); // 답변 텍스트 상태
    const [selectedQnA, setSelectedQnA] = useState<number | null>(null); // 선택된 QnA 번호
    const [creatorId, setCreatorId] = useState<string | null>(null); // 쿠키에서 가져온 creatorId
    const [query] = useSearchParams(); // 쿼리 파라미터 사용
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

    // QnA 목록을 불러오는 함수
    const fetchQnAList = async (page: number) => {
        if (!creatorId) return; // creatorId가 없으면 실행하지 않음
        try {
            const data = await getQnAList(page, 10, creatorId); // creatorId 전달
            setQnAList(data.dtoList);
            setPageInfo(data);
        } catch (error) {
            console.error("Failed to fetch QnA list:", error);
        }
    };

    // QnA 답변을 추가/수정하는 함수
    const handleAnswerSubmit = async () => {
        if (selectedQnA && answer.trim()) {
            try {
                await addQnAAnswer(selectedQnA, answer);
                alert("답변이 처리되었습니다.");
                setAnswer("");
                setSelectedQnA(null);
                fetchQnAList(currentPage); // 답변 후 QnA 목록 갱신
            } catch (error) {
                console.error("Failed to add or update answer:", error);
                alert("답변 처리에 실패했습니다.");
            }
        } else {
            alert("답변 내용을 입력해주세요.");
        }
    };

    useEffect(() => {
        const page = Number(query.get("page")) || 1;
        setCurrentPage(page); // 쿼리에서 `page` 값을 가져와서 상태 업데이트
        fetchQnAList(page); // 페이지가 변경될 때마다 QnA 목록 갱신
    }, [query, creatorId]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Q&A 리스트</h1>
            <ul className="space-y-4">
                {qnaList.map((qna) => (
                    <li key={qna.qnaNo} className="bg-white p-4 rounded-lg shadow">
                        <div>
                            <h2 className="text-lg font-bold">{qna.productName}</h2>
                            <p className="text-sm text-gray-600">{qna.customerName}</p>
                            <p className="text-sm text-gray-400">작성일: {qna.createdAt}</p>
                            <p className="mt-2">{qna.question}</p>
                        </div>

                        {/* QnA 이미지 */}
                        {qna.qnaImages && qna.qnaImages.length > 0 && (
                            <div className="mt-4 flex space-x-2">
                                {qna.qnaImages.map((image) => (
                                    <img
                                        key={image.qnaImageNo}
                                        src={image.qnaImageUrl}
                                        alt="QnA 관련 이미지"
                                        className="w-32 h-32 rounded object-cover"
                                    />
                                ))}
                            </div>
                        )}

                        {/* 판매자 답변 */}
                        {selectedQnA === qna.qnaNo ? (
                            <div className="mt-4">
                                <textarea
                                    className="w-full p-2 border rounded resize-none"
                                    rows={3}
                                    placeholder="답변을 입력하세요"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                ></textarea>
                                <div className="mt-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={handleAnswerSubmit}
                                    >
                                        수정완료
                                    </button>
                                    <button
                                        className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                        onClick={() => {
                                            setSelectedQnA(null);
                                            setAnswer("");
                                        }}
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 p-2 bg-gray-100 border rounded">
                                <span className="text-blue-500 font-bold">판매자 답변:</span>{" "}
                                {qna.answer || "답변이 없습니다."}
                                <button
                                    className="ml-2 text-sm text-blue-500"
                                    onClick={() => {
                                        setSelectedQnA(qna.qnaNo);
                                        setAnswer(qna.answer || ""); // 기존 답변 내용을 입력창에 표시
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

export default QnAListComponent;
