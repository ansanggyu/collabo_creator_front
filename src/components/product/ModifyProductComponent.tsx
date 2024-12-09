import { useParams, useNavigate } from "react-router-dom";
import { IProduct, IProductRequest, IUserCategory } from "../../types/iproduct.ts";
import React, { useEffect, useState } from "react";
import LoadingPage from "../../pages/LoadingPage.tsx";
import { getProductOne, updateProduct } from "../../apis/product/productAPI.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { getCategoriesByCreator } from "../../apis/category/categoryAPI.ts";
import { uploadS3Images } from "../../apis/image/imageUploadAPI.ts";

const initialState: IProduct = {
    categoryNo: 0,
    createdAt: "",
    creatorName: "",
    productNo: 0,
    productName: "",
    productDescription: "",
    productPrice: 0,
    stock: 0,
    productStatus: "",
    categoryName: "",
    rating: 0,
    productImages: [],
};

const productStatusMapping: { [key: string]: number } = {
    "판매중": 1,
    "판매중지": 2,
    "품절": 3,
};

function ModifyProductComponent() {
    const { productNo } = useParams();
    const navigate = useNavigate();
    const creatorId = useSelector((state: RootState) => state.signin.creatorId);
    const [product, setProduct] = useState<IProduct>(initialState);
    const [categories, setCategories] = useState<IUserCategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState<(string | undefined)[]>(Array(6).fill(undefined));
    const [imageFiles, setImageFiles] = useState<(File | undefined)[]>(Array(6).fill(undefined));

    // 입력 값 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "productPrice" || name === "stock" ? Number(value) : value,
        }));
    };

    // 카테고리 변경 핸들러
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = categories.find((category) => category.categoryNo === Number(e.target.value));
        if (selectedCategory) {
            setProduct((prev) => ({
                ...prev,
                categoryNo: selectedCategory.categoryNo,
                categoryName: selectedCategory.categoryName,
            }));
        } else {
            console.error("카테고리가 유효하지 않습니다.");
        }
    };

    useEffect(() => {
        if (!creatorId) {
            console.error("Redux 상태에서 creatorId를 가져오지 못했습니다.");
            return;
        }
        const pno = Number(productNo);

        // 상품 데이터와 카테고리 데이터를 병렬로 가져옴
        Promise.all([getProductOne(pno), getCategoriesByCreator(creatorId)])
            .then(([productResult, categoryList]) => {
                if (!productResult) {
                    throw new Error("상품 정보를 불러오지 못했습니다.");
                }

                const sortedImages = productResult.productImages?.sort((a, b) => a.productImageOrd - b.productImageOrd) || [];
                setProduct(productResult);
                setPreviewImages(sortedImages.map((img) => img.productImageUrl));
                setCategories(categoryList);
            })
            .catch((error) => {
                console.error("데이터 로드 중 오류 발생:", error);
            })
            .finally(() => setLoading(false));
    }, [productNo, creatorId]);

    const handleSave = async () => {
        if (!product.productNo || !creatorId) {
            alert("상품 번호 또는 작성자 ID가 누락되었습니다.");
            return;
        }

        const categoryNoToSave = product.categoryNo || categories.find((c) => c.categoryName === product.categoryName)?.categoryNo;

        if (!categoryNoToSave) {
            alert("카테고리가 설정되지 않았습니다.");
            return;
        }

        try {
            setLoading(true);

            // 기존 DB 이미지 DTO 생성 (삭제된 이미지는 제외)
            const dbImageDTOs = previewImages
                .map((image, index) => image && { productImageUrl: image, productImageOrd: index })
                .filter((item): item is { productImageUrl: string; productImageOrd: number } => !!item);

            console.log("기존 DB 이미지:", dbImageDTOs);

            // 최종 이미지 DTO (삭제된 이미지는 포함하지 않음)
            const combinedImageDTOs = [...dbImageDTOs];

            console.log("최종 이미지 DTO:", combinedImageDTOs);

            // 상품 정보 업데이트
            const productStatusNumber = productStatusMapping[product.productStatus];
            const payload: IProductRequest = {
                productNo: product.productNo,
                productName: product.productName,
                productDescription: product.productDescription,
                productPrice: product.productPrice,
                stock: product.stock,
                productStatus: productStatusNumber,
                categoryNo: categoryNoToSave,
                creatorId,
                productImages: combinedImageDTOs, // 삭제된 이미지를 제외한 업로드된 이미지만 포함
            };

            console.log("상품 업데이트 payload:", payload);

            await updateProduct(creatorId, payload);

            alert("상품 정보가 성공적으로 수정되었습니다.");
            navigate(`/product/detail/${product.productNo}`);
        } catch (error) {
            console.error("상품 정보 수정 중 오류 발생:", error);
            alert("상품 정보 수정에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };




    const handleImageUpload = async (file: File, index: number) => {
        const updatedPreviewImages = [...previewImages];
        const updatedImageFiles = [...imageFiles];

        try {
            const uploadedUrls = await uploadS3Images([file]); // S3 업로드
            if (uploadedUrls.length > 0) {
                updatedPreviewImages[index] = uploadedUrls[0];
                updatedImageFiles[index] = file;
            }
        } catch (error) {
            console.error("이미지 업로드 중 오류 발생:", error);
            alert("이미지 업로드에 실패했습니다.");
        }

        setPreviewImages(updatedPreviewImages);
        setImageFiles(updatedImageFiles);
    };

    const handleImageDelete = (index: number) => {
        const updatedPreviewImages = [...previewImages];
        const updatedImageFiles = [...imageFiles];

        updatedPreviewImages[index] = undefined;
        updatedImageFiles[index] = undefined;

        setPreviewImages(updatedPreviewImages);
        setImageFiles(updatedImageFiles);
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {loading && <LoadingPage />}

            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">상품 수정</h1>
                <p className="text-sm text-gray-600">상품 정보를 수정하세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">이미지 업로드 (최대 6개)</label>
                        <div className="grid grid-cols-3 gap-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="relative flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
                                >
                                    {previewImages[index] ? (
                                        <>
                                            <img
                                                src={previewImages[index]}
                                                alt={`이미지 ${index + 1}`}
                                                className="w-full h-full object-cover"
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
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <label className="text-sm text-gray-600 mb-1 block">상품명</label>
                            <input
                                type="text"
                                name="productName"
                                value={product.productName}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 text-gray-800"
                            />
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4">
                            <label className="text-sm text-gray-600 mb-1 block">상품 가격</label>
                            <input
                                type="number"
                                name="productPrice"
                                value={product.productPrice}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 text-gray-800"
                            />
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4">
                            <label className="text-sm text-gray-600 mb-1 block">카테고리</label>
                            <select
                                name="categoryNo"
                                value={product.categoryNo || ""}
                                onChange={handleCategoryChange}
                                className="w-full border rounded-lg p-2 text-gray-800"
                            >
                                <option value="" disabled>
                                    {product.categoryName || "카테고리를 선택하세요"}
                                </option>
                                {categories.map((category) => (
                                    <option key={category.categoryNo} value={category.categoryNo}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4">
                            <label className="text-sm text-gray-600 mb-1 block">판매 상태</label>
                            <select
                                name="productStatus"
                                value={product.productStatus}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 text-gray-800"
                            >
                                <option value="판매중">판매중</option>
                                <option value="판매중지">판매중지</option>
                                <option value="품절">품절</option>
                            </select>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
                            <label className="text-sm text-gray-600 mb-1 block">재고 수량</label>
                            <input
                                type="number"
                                name="stock"
                                value={product.stock}
                                onChange={handleInputChange}
                                className="w-full border rounded-lg p-2 text-gray-800"
                            />
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <label className="text-sm text-gray-600 mb-1 block">상품 설명</label>
                        <textarea
                            name="productDescription"
                            value={product.productDescription}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2 text-gray-800"
                        />
                    </div>
                </div>
            </div>

            <div className="text-right mt-4">
                <button
                    onClick={handleSave}
                    disabled={loading || !product.productNo}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-lg transition text-sm ${
                        loading || !product.productNo ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                    }`}
                >
                    저장하기
                </button>
            </div>
        </div>
    );
}

export default ModifyProductComponent;
