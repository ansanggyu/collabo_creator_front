function ProductListComponent() {
    const products = [
        { id: 1, name: "상품 1", stock: 10, price: 10000 },
        { id: 2, name: "상품 2", stock: 5, price: 20000 },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id} className="p-4 border-b">
                        <h2>{product.name}</h2>
                        <p>가격: {product.price}원</p>
                        <p>재고: {product.stock}개</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductListComponent;
