import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockProductDetail = {
    id: 1,
    name: "스마트폰",
    description: "최신형 스마트폰입니다.",
    price: 1000000,
    stock: 50,
};

function ModifyProductComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(mockProductDetail);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("수정된 상품:", product);
        alert("상품 정보가 수정되었습니다.");
        navigate(`/product/detail/${id}`);
    };

    return (
        <form onSubmit={handleSave} className="p-4 shadow rounded bg-white">
            <h1 className="text-xl font-bold mb-4">상품 수정 - #{id}</h1>
            <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="상품명"
                className="border p-2 w-full mb-4"
                required
            />
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="가격"
                className="border p-2 w-full mb-4"
                required
            />
            <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="재고"
                className="border p-2 w-full mb-4"
                required
            />
            <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="상품 설명"
                className="border p-2 w-full mb-4"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                저장하기
            </button>
        </form>
    );
}

export default ModifyProductComponent;
