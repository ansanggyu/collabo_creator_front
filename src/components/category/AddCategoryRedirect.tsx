import { useNavigate } from "react-router-dom";

function AddCategoryRedirect() {
    const navigate = useNavigate();

    return (
        <div className="text-right mt-2">
            <button
                onClick={() => navigate("/category/add")}
                className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200">
            카테고리 등록 페이지로 이동
            </button>
        </div>
);
}

export default AddCategoryRedirect;
