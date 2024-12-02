import { useState } from "react";
import { useParams } from "react-router-dom";

function QnADetailComponent() {
    const { id } = useParams();
    const [answer, setAnswer] = useState("");

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };

    const handleSubmitAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        alert("답변이 등록되었습니다.");
        // API 호출로 답변 등록 처리
    };

    return (
        <div className="qna-detail">
            <h1 className="text-xl font-bold mb-4">Q&A 상세 - #{id}</h1>
            <div className="mb-4">
                <label>답변:</label>
                <input
                    type="text"
                    value={answer}
                    onChange={handleAnswerChange}
                    placeholder="답변을 입력하세요"
                    className="border p-2 w-full"
                />
            </div>
            <button
                onClick={handleSubmitAnswer}
                className="bg-blue-500 text-white p-2 rounded"
            >
                답변 등록
            </button>
        </div>
    );
}

export default QnADetailComponent;
