function CategoryListComponent() {
    const categories = [
        { id: 1, name: "전자제품" },
        { id: 2, name: "가구" },
        { id: 3, name: "생활용품" },
    ];

    const handleEdit = (id: number) => {
        console.log(`카테고리 수정: ${id}`);
    };

    const handleDelete = (id: number) => {
        console.log(`카테고리 삭제: ${id}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">카테고리 관리</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id} className="p-4 border-b flex justify-between">
                        <span>{category.name}</span>
                        <div className="space-x-4">
                            <button
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={() => handleEdit(category.id)}
                            >
                                수정
                            </button>
                            <button
                                className="bg-red-500 text-white p-2 rounded"
                                onClick={() => handleDelete(category.id)}
                            >
                                삭제
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryListComponent;
