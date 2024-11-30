import {useParams, useNavigate} from "react-router-dom";
import {IProduct} from "../../types/iproduct.ts";
import {useEffect, useState} from "react";
import LoadingPage from "../../pages/LoadingPage.tsx";
import {getProductOne} from "../../apis/product/productAPI.ts";

const initialState : IProduct = {
    productNo: 0,
    productName: "",
    productDescription: "",
    productPrice: 0,
    stock: 0,
    productStatus: "",
    categoryName: "",
    rating: 0,
    productImageUrl: ""
}

function ProductDetailComponent() {
    const {productNo} = useParams()
    const [product, setProduct] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/product/modify/${productNo}`)
    }

    useEffect(() => {
        setLoading(true)
        const pno = Number(productNo)
        console.log(pno);
        getProductOne(pno).then(result => {
            setProduct(result)
            setLoading(false)
        })
    },[productNo])

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {loading && <LoadingPage></LoadingPage>}
            {/* 상세 정보 헤더 */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    상품 이름 : {product.productName}
                </h1>
                <p className="text-sm text-gray-600">
                    상품 정보를 확인하고 수정할 수 있습니다.
                </p>
            </div>

            {/* 상세 정보 컨테이너 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 상품 이미지 */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-2 text-center text-sm text-gray-600">
                        상품 이미지
                    </div>
                    <img
                        src={product.productImageUrl}
                        alt="주요 상품 이미지"
                        className="w-full h-60 object-cover"
                    />
                    <div className="flex justify-center space-x-2 mt-2 p-2 bg-gray-100">
                        {/*{thumbnailImages.map((image) => (*/}
                        {/*    <img*/}
                        {/*        key={image.id}*/}
                        {/*        src={image.url}*/}
                        {/*        alt={`썸네일 이미지 ${image.id}`}*/}
                        {/*        className="w-16 h-16 object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-blue-500"*/}
                        {/*    />*/}
                        {/*))}*/}
                    </div>
                </div>

                {/* 상품 정보 */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* 상품명 */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">상품명</p>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {product.productName}
                            </h2>
                        </div>

                        {/* 상품 가격 */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">상품 가격</p>
                            <p className="text-lg font-bold text-gray-800">
                                {product.productPrice.toLocaleString()}원
                            </p>
                        </div>

                        {/* 카테고리 */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">카테고리</p>
                            <p className="text-lg font-bold text-gray-800">
                                {product.categoryName}
                            </p>
                        </div>

                        {/* 판매 상태 */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">판매 상태</p>
                            <p
                                className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                                    product.productStatus === "판매중"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-red-600"
                                }`}
                            >
                                {product.productStatus}
                            </p>
                        </div>

                        {/* 재고 수량 */}
                        <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
                            <p className="text-sm text-gray-600 mb-1">재고 수량</p>
                            <p className="text-lg font-bold text-gray-800">
                                {product.stock > 0 ? `${product.stock}개` : "품절"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상품 설명과 리뷰 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* 상품 설명 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        상품 설명
                    </h2>
                    <p className="text-sm text-gray-700">{product.productDescription}</p>
                </div>

                {/* 고객 리뷰 */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        고객 리뷰  {/*이거를 별표처리 */}{product.rating}
                    </h2>
                    <p className="text-sm text-gray-600">
                    </p>
                </div>
            </div>

            {/* 수정하기 버튼 */}
            <div className="text-right mt-4">
                <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                >
                    수정하기
                </button>
            </div>
        </div>
    );
}

export default ProductDetailComponent;
