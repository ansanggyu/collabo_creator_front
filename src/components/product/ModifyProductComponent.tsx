import { useParams, useNavigate } from "react-router-dom";
import { IProduct, IUserCategory } from "../../types/iproduct.ts";
import { useEffect, useState } from "react";
import LoadingPage from "../../pages/LoadingPage.tsx";
import { getProductOne, updateProduct, getCategoriesByCreator } from "../../apis/product/productAPI.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";

const initialState: IProduct = {
    categoryNo: 0,
    createdAt: "",
    creatorName: "",
    productImageOrd: 0,
    productNo: 0,
    productName: "",
    productDescription: "",
    productPrice: 0,
    stock: 0,
    productStatus: "",
    categoryName: "",
    rating: 0,
    productImageUrl: "",
};

// 상태 매핑 테이블
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

    // 저장 버튼 핸들러
    const handleSave = async () => {
        if (!product.productNo || !creatorId) {
            alert("상품 번호 또는 작성자 ID가 누락되었습니다.");
            return;
        }
        if (!product.categoryNo) {
            alert("카테고리가 선택되지 않았습니다.");
            return;
        }
        try {
            // `productStatus`를 숫자로 변환
            const productStatusNumber = productStatusMapping[product.productStatus];
            const payload = {
                ...product,
                productStatus: productStatusNumber.toString(), // 숫자를 문자열로 변환
            };
            await updateProduct(creatorId, payload); // payload는 IProduct 타입과 일치
            alert("상품 정보가 성공적으로 수정되었습니다.");
            navigate(`/product/detail/${product.productNo}`);
        } catch (error: any) {
            console.error("상품 정보 수정 중 오류 발생:", error.message);
            alert("상품 정보 수정에 실패했습니다.");
        }
    };

    // 데이터 초기화
    useEffect(() => {
        if (!creatorId || creatorId.trim() === "") {
            console.error("Redux 상태에서 creatorId를 가져오지 못했습니다.");
            return;
        }

        setLoading(true);
        const pno = Number(productNo);

        // 상품 정보 불러오기
        Promise.all([
            getProductOne(pno).then((result) => {
                if (!result || !result.productNo) {
                    console.error("Invalid product data:", result);
                    throw new Error("상품 정보를 불러오지 못했습니다.");
                }
                setProduct(result);
            }),
            getCategoriesByCreator(creatorId).then((categoryList) => setCategories(categoryList)),
        ])
            .catch((error) => {
                console.error("데이터 로드 중 오류 발생:", error);
                alert("데이터를 로드하는 중 문제가 발생했습니다.");
            })
            .finally(() => setLoading(false));
    }, [productNo, creatorId]);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {loading && <LoadingPage />}

            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">상품 수정</h1>
                <p className="text-sm text-gray-600">상품 정보를 수정하세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-2 text-center text-sm text-gray-600">상품 이미지</div>
                    <img
                        src={product.productImageUrl}
                        alt="주요 상품 이미지"
                        className="w-full h-60 object-cover"
                    />
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
                                value={product.categoryNo}
                                onChange={handleCategoryChange}
                                className="w-full border rounded-lg p-2 text-gray-800"
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
