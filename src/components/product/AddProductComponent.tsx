import React, { useState, useEffect } from "react";
import { addProduct } from "../../apis/product/productAPI.ts";
import { IProductRequest, IUserCategory } from "../../types/iproduct";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import {uploadS3Images} from "../../apis/image/imageUploadAPI.ts";
import {getCategoriesByCreator} from "../../apis/category/categoryAPI.ts";
import {useNavigate} from "react-router-dom";

const initialState: IProductRequest = {
    productNo: 0,
    productName: "",
    productPrice: 0,
    stock: 0,
    productDescription: "",
    productStatus: 1,
    categoryNo: 0,
    creatorId: "",
    productImages: [],
};

function AddProductComponent() {
    const [productName, setProductName] = useState(initialState.productName);
    const [productDescription, setProductDescription] = useState(initialState.productDescription);
    const [productPrice, setProductPrice] = useState(initialState.productPrice.toString());
    const [productStock, setProductStock] = useState(initialState.stock.toString());
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [categories, setCategories] = useState<IUserCategory[]>([]);
    const [imageFiles, setImageFiles] = useState<(File | undefined)[]>(Array(6).fill(undefined)); // 이미지 최대 6개
    const [previewImages, setPreviewImages] = useState<(string | undefined)[]>(Array(6).fill(undefined)); // Base64 미리보기
    const navigate = useNavigate()

    const creatorId = useSelector((state: RootState) => state.signin.creatorId);

    // 카테고리 불러오기
    useEffect(() => {
        const fetchCategories = async () => {
            if (!creatorId) return;
            try {
                const result = await getCategoriesByCreator(creatorId);
                setCategories(result);
            } catch (error) {
                console.error("카테고리 불러오기 실패:", error);
            }
        };

        fetchCategories();
    }, [creatorId]);

    // 이미지 업로드 핸들러
    const handleImageUpload = (file: File, index: number) => {
        const reader = new FileReader();
        reader.onload = () => {
            const updatedPreviewImages = [...previewImages];
            const updatedImageFiles = [...imageFiles];

            updatedPreviewImages[index] = reader.result as string; // Base64 미리보기
            updatedImageFiles[index] = file; // 실제 파일 저장

            setPreviewImages(updatedPreviewImages);
            setImageFiles(updatedImageFiles);
        };
        reader.readAsDataURL(file);
    };

    // 이미지 삭제 핸들러
    const handleImageDelete = (index: number) => {
        const updatedPreviewImages = [...previewImages];
        const updatedImageFiles = [...imageFiles];

        updatedPreviewImages[index] = undefined; // 미리보기 삭제
        updatedImageFiles[index] = undefined; // 파일 삭제

        setPreviewImages(updatedPreviewImages);
        setImageFiles(updatedImageFiles);
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productName || !productPrice || !productStock || selectedCategory === null || !creatorId) {
            alert("모든 필드를 입력해주세요!");
            return;
        }

        try {
            // 1. 유효한 파일 필터링
            const validFiles = imageFiles.filter((file) => file !== undefined) as File[];

            // 2. S3 이미지 업로드
            const uploadedUrls = await uploadS3Images(validFiles); // API에서 이미지 URL 리스트 반환
            if (!uploadedUrls || uploadedUrls.length === 0) {
                alert("이미지 업로드에 실패했습니다.");
                return;
            }

            // 3. 상품 데이터 준비
            const productData: IProductRequest = {
                productName,
                productDescription,
                productPrice: Number(productPrice),
                stock: Number(productStock),
                productStatus: 1,
                categoryNo: selectedCategory,
                creatorId,
                productImages: uploadedUrls.map((url, index) => ({ productImageUrl: url, productImageOrd: index })), // 순서 추가
            };

            // 4. 상품 등록
            await addProduct(productData);
            alert("상품이 성공적으로 등록되었습니다!");
            resetForm();
        } catch (error) {
            if (error) {
                console.error("Axios Error Response:", error);
                console.error("Axios Error Status:", error);
            } else {
                console.error("Non-Axios Error:", error);
            }
            alert("상품 등록에 실패했습니다.");
        }
    };


    // 폼 초기화 함수
    const resetForm = () => {
        setProductName(initialState.productName);
        setProductDescription(initialState.productDescription);
        setProductPrice(initialState.productPrice.toString());
        setProductStock(initialState.stock.toString());
        setSelectedCategory(null);
        setPreviewImages(Array(6).fill(undefined));
        setImageFiles(Array(6).fill(undefined));
    };

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
                        value={selectedCategory ?? ""}
                        onChange={(e) => setSelectedCategory(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                    >
                        <option value="" disabled>
                            카테고리를 선택하세요
                        </option>
                        {categories.map((category) => (
                            <option key={category.categoryNo} value={category.categoryNo}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 카테고리 등록 버튼 */}
                <div className="text-right mt-2">
                    <button
                        type="button" // 버튼이 폼 제출을 방지
                        onClick={() => navigate("/category/add")} // 이동 로직
                        className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200">
                        카테고리 등록
                    </button>
                </div>

                {/* 이미지 업로드 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이미지 업로드 (최대 6개)</label>
                    <div className="grid grid-cols-3 gap-4">
                        {previewImages.map((image, index) => (
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
        </div>
    );

}

export default AddProductComponent;