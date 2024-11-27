import { useState } from "react";
import { useParams } from "react-router-dom";

const mockQnA = {
    1: {
        product: "스마트폰",
        question: "이 제품의 배터리 용량은 얼마인가요?",
    },
    2: {
        product: "노트북",
        question: "윈도우 10이 설치되어 있나요?",
    },
};

function QnADetailComponent() {
    const { id } = useParams();
    const [answer, setAnswer] = useState("");

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };

    const handleSubmitAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        alert("답변이 등록되었습니다.");
        // 여기서 API 호출을 추가해 답변 데이터를 서버로 보낼 수 있습니다.
    };

    const qna = mockQnA[id || 1]; // 임시로 QnA 데이터를 가져옴.

    return (
        <div className="qna-detail p-4">
            <h1 className="text-2xl font-bold mb-6">Q&A 상세</h1>
            <div className="border rounded p-4 bg-white shadow">
                <div className="mb-3">
                    <span className="text-gray-800 font-semibold">상품명: </span>
                    {qna.product}
                </div>
                <div className="mb-4">
                    <span className="text-gray-800 font-semibold">질문: </span>
                    {qna.question}
                </div>
                <form onSubmit={handleSubmitAnswer} className="flex flex-col gap-4">
                    <label className="block">
                        <span className="text-gray-700 font-semibold">답변 입력:</span>
                        <input
                            type="text"
                            value={answer}
                            onChange={handleAnswerChange}
                            placeholder="답변을 입력하세요"
                            className="mt-2 p-2 border rounded w-full"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        답변 등록
                    </button>
                </form>
            </div>
        </div>
    );
}

export default QnADetailComponent;
