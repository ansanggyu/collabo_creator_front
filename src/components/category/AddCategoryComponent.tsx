function AddCategoryComponent() {
    return (
        <form className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">카테고리 추가</h1>
            <input
                type="text"
                placeholder="카테고리 이름"
                className="border rounded p-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                추가
            </button>
        </form>
    );
}

export default AddCategoryComponent;
