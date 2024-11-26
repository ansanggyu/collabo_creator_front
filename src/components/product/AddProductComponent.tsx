function AddProductComponent() {
    return (
        <form className="space-y-4">
            <h1 className="text-2xl font-bold">Add Product</h1>
            <input type="text" placeholder="상품명" className="border rounded p-2 w-full" />
            <textarea placeholder="상품 설명" className="border rounded p-2 w-full"></textarea>
            <input type="number" placeholder="가격" className="border rounded p-2 w-full" />
            <input type="number" placeholder="재고 수량" className="border rounded p-2 w-full" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">등록</button>
        </form>
    );
}

export default AddProductComponent;
