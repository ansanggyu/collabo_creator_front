function ProductStatsComponent() {
    const stats = [
        { productName: "상품 1", sales: 100, refunds: 2 },
        { productName: "상품 2", sales: 50, refunds: 1 },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Product Statistics</h1>
            <ul>
                {stats.map((stat, index) => (
                    <li key={index} className="p-4 border-b">
                        <h2>상품명: {stat.productName}</h2>
                        <p>판매량: {stat.sales}</p>
                        <p>환불: {stat.refunds}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductStatsComponent;
