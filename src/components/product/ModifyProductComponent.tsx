import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockProductDetail = {
    id: 1,
    name: "스마트폰",
    description: "최신형 스마트폰입니다.",
    price: 1000000,
    stock: 50,
    category: "전자제품",
    status: "판매중",
    images: [],
};

function ModifyProductComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(mockProductDetail);

    const handleImageUpload = (file: File, index: number) => {
        const reader = new FileReader();
        reader.onload = () => {
            const updatedImages = [...product.images];
            updatedImages[index] = { id: index + 1, url: reader.result, ord: index + 1 };
            setProduct({ ...product, images: updatedImages });
        };
        reader.readAsDataURL(file);
    };

    const handleImageDelete = (index: number) => {
        const updatedImages = [...product.images];
        updatedImages[index] = undefined; // 해당 칸 비우기
        setProduct({ ...product, images: updatedImages });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("수정된 상품:", product);
        alert("상품 정보가 수정되었습니다.");
        navigate(`/product/detail/${id}`);
    };

    return (
        <form onSubmit={handleSave} className="p-4 bg-gray-50 min-h-screen">
            {/* 수정 화면 헤더 */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    상품 수정 - #{id}
                </h1>
                <p className="text-sm text-gray-600">상품 정보를 수정하고 저장하세요.</p>
            </div>

            {/* 이미지 관리 */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">이미지 관리 (최대 6개)</h2>
                <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg"
                        >
                            {product.images[index] ? (
                                <>
                                    <img
                                        src={product.images[index]?.url as string}
                                        alt={`이미지 ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageDelete(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                                    >
                                        X
                                    </button>
                                </>
                            ) : (
                                <label
                                    htmlFor={`image-upload-${index}`}
                                    className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-400"
                                >
                                    <span className="text-sm">{index + 1}</span>
                                    <span className="text-xs">이미지 추가</span>
                                    <input
                                        id={`image-upload-${index}`}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            e.target.files && handleImageUpload(e.target.files[0], index)
                                        }
                                    />
                                </label>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 수정 가능한 상세 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 상품명 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">상품명</p>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={(e) =>
                            setProduct({ ...product, name: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                        required
                    />
                </div>

                {/* 상품 가격 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">상품 가격</p>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({ ...product, price: parseInt(e.target.value, 10) })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                        required
                    />
                </div>

                {/* 카테고리 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">카테고리</p>
                    <select
                        name="category"
                        value={product.category}
                        onChange={(e) =>
                            setProduct({ ...product, category: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                        <option value="전자제품">전자제품</option>
                        <option value="의류">의류</option>
                        <option value="가구">가구</option>
                        <option value="식품">식품</option>
                        <option value="기타">기타</option>
                    </select>
                </div>

                {/* 판매 상태 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">판매 상태</p>
                    <select
                        name="status"
                        value={product.status}
                        onChange={(e) =>
                            setProduct({ ...product, status: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                        <option value="판매중">판매중</option>
                        <option value="판매중지">판매중지</option>
                        <option value="품절">품절</option>
                    </select>
                </div>

                {/* 재고 수량 */}
                <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
                    <p className="text-sm text-gray-600 mb-1">재고 수량</p>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={(e) =>
                            setProduct({ ...product, stock: parseInt(e.target.value, 10) })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                        required
                    />
                </div>
            </div>

            {/* 상품 설명 */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    상품 설명
                </h2>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    rows={4}
                    required
                />
            </div>

            {/* 저장 버튼 */}
            <div className="text-right mt-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                >
                    저장하기
                </button>
            </div>
        </form>
    );
}

export default ModifyProductComponent;
