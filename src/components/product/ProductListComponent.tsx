function ProductListComponent() {
    const products = [
        { id: 1, name: "상품 1", stock: 10, price: 10000 },
        { id: 2, name: "상품 2", stock: 5, price: 20000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
        { id: 3, name: "상품 3", stock: 0, price: 15000 },
    ];

    return (
        <div className="p-6 bg-gray-50">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                    + Add Product
                </button>
            </div>

            {/* 제품 리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        {/* 제품 이미지 (대체 이미지로 설정) */}
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xl">No Image</span>
                        </div>

                        {/* 제품 상세 */}
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                            <p className="text-gray-600 mt-1">가격: {product.price.toLocaleString()}원</p>
                            <p
                                className={`mt-1 text-sm ${
                                    product.stock > 0 ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                재고: {product.stock > 0 ? `${product.stock}개` : "품절"}
                            </p>
                        </div>

                        {/* 하단 액션 버튼 */}
                        <div className="p-4 bg-gray-100 flex justify-end space-x-2">
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                                Edit
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductListComponent;