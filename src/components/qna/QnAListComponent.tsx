import { useNavigate } from "react-router-dom";

const mockQnA = [
    { id: 1, product: "스마트폰", question: "이 제품의 배터리 용량은 얼마인가요?", likes: 5 },
    { id: 2, product: "노트북", question: "윈도우 10이 설치되어 있나요?", likes: 3 },
];

function QnAListComponent() {
    const navigate = useNavigate();

    const goToDetail = (id: number) => {
        navigate(`/qna/detail/${id}`);
    };

    return (
        <div className="qna-list p-4">
            <h1 className="text-2xl font-bold mb-6">Q&A 리스트</h1>
            <ul className="space-y-4">
                {mockQnA.map((qna) => (
                    <li
                        key={qna.id}
                        className="border rounded shadow p-4 bg-white flex flex-col gap-3"
                    >
                        <div>
                            <span className="text-gray-800 font-semibold">상품명: </span>
                            {qna.product}
                        </div>
                        <div>
                            <span className="text-gray-800 font-semibold">질문: </span>
                            {qna.question}
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">좋아요: {qna.likes}</span>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => goToDetail(qna.id)}
                            >
                                답변하기
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QnAListComponent;
