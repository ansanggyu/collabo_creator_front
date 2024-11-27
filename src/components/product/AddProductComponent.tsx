import React, { useState } from "react";

function AddProductComponent() {
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // 모달 상태
    const [categories, setCategories] = useState(["전자제품", "의류", "가구", "식품", "기타"]); // 카테고리 리스트
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productStock, setProductStock] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // 이미지 미리보기 배열

    // 이미지 업로드 핸들러
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const previews = Array.from(files).map((file) => {
                return URL.createObjectURL(file); // 파일을 URL로 변환
            });
            setImagePreviews((prev) => [...prev, ...previews]); // 이전 미리보기와 합침
        }
    };

    // 이미지 삭제 핸들러
    const handleImageDelete = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("상품이 등록되었습니다!");
        console.log({
            productName,
            productDescription,
            productPrice,
            productStock,
            selectedCategory,
            imagePreviews, // 업로드된 이미지 데이터
        });
    };

    const openCategoryModal = () => setIsCategoryModalOpen(true);
    const closeCategoryModal = () => setIsCategoryModalOpen(false);

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">상품 등록</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* 상품명 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">상품명</label>
                    <input
                        type="text"
                        placeholder="상품명을 입력하세요"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    />
                </div>

                {/* 상품 설명 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">상품 설명</label>
                    <textarea
                        placeholder="상품 설명을 입력하세요"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    ></textarea>
                </div>

                {/* 가격 및 재고 */}
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">가격</label>
                        <input
                            type="number"
                            placeholder="상품 가격"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">재고 수량</label>
                        <input
                            type="number"
                            placeholder="재고 수량"
                            value={productStock}
                            onChange={(e) => setProductStock(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                        />
                    </div>
                </div>

                {/* 카테고리 선택 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                        <option value="" disabled>
                            카테고리를 선택하세요
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 카테고리 관리 버튼 */}
                <div className="mt-4 text-right">
                    <button
                        type="button"
                        onClick={openCategoryModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        카테고리 관리
                    </button>
                </div>

                {/* 이미지 업로드 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이미지 업로드</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    />
                </div>

                {/* 이미지 미리보기 */}
                {imagePreviews.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">이미지 미리보기:</p>
                        <div className="grid grid-cols-3 gap-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={preview}
                                        alt={`미리보기 ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg border border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageDelete(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 등록 버튼 */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        등록
                    </button>
                </div>
            </form>

            {/* 카테고리 관리 모달 */}
            {isCategoryModalOpen && (
                <CategoryListModal
                    onClose={closeCategoryModal}
                    categories={categories}
                    setCategories={setCategories}
                />
            )}
        </div>
    );
}

// 모달 컴포넌트
function CategoryListModal({
                               onClose,
                               categories,
                               setCategories,
                           }: {
    onClose: () => void;
    categories: string[];
    setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory("");
        }
    };

    const handleDelete = (category: string) => {
        setCategories(categories.filter((c) => c !== category));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <h1 className="text-2xl font-bold mb-4">카테고리 관리</h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="새 카테고리 이름"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    <button
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleAddCategory}
                    >
                        카테고리 추가
                    </button>
                </div>
                <ul className="mt-4 space-y-2">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center p-2 border-b"
                        >
                            <span>{category}</span>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => handleDelete(category)}
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="text-right mt-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={onClose}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProductComponent;