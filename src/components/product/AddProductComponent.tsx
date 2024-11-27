import React, { useState } from "react";

function AddProductComponent() {
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // 모달 상태
    const [categories, setCategories] = useState(["전자제품", "의류", "가구", "식품", "기타"]); // 카테고리 리스트
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productStock, setProductStock] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [images, setImages] = useState<(string | undefined)[]>(Array(6).fill(undefined)); // 이미지 최대 6개

    // 이미지 업로드 핸들러
    const handleImageUpload = (file: File, index: number) => {
        const reader = new FileReader();
        reader.onload = () => {
            const updatedImages = [...images];
            updatedImages[index] = reader.result as string; // Base64로 변환
            setImages(updatedImages);
        };
        reader.readAsDataURL(file);
    };

    // 이미지 삭제 핸들러
    const handleImageDelete = (index: number) => {
        const updatedImages = [...images];
        updatedImages[index] = undefined; // 해당 박스를 비우기
        setImages(updatedImages);
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
            images, // 업로드된 이미지 데이터
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">이미지 업로드 (최대 6개)</label>
                    <div className="grid grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg"
                            >
                                {image ? (
                                    <>
                                        <img
                                            src={image}
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

// 모달 컴포넌트 (기존과 동일)
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
