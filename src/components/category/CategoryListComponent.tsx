function CategoryListComponent() {
    const categories = [
        { id: 1, name: "카테고리 1" },
        { id: 2, name: "카테고리 2" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Category List</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id} className="p-4 border-b">
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryListComponent;
