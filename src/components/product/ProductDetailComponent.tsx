import { useParams, useNavigate } from "react-router-dom";
import { IProduct } from "../../types/iproduct.ts";
import { useEffect, useState } from "react";
import LoadingPage from "../../pages/LoadingPage.tsx";
import { getProductOne } from "../../apis/product/productAPI.ts";
import { getReviewList } from "../../apis/review/reviewAPI.ts";
import { IReview } from "../../types/ireview.ts";

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

function ProductDetailComponent() {
    const { productNo } = useParams();
    const [product, setProduct] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [reviewLoading, setReviewLoading] = useState(false); // 리뷰 로딩 상태 추가

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/product/modify/${productNo}`);
    };

    // 상품 상세 정보 가져오기
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const pno = Number(productNo);
            try {
                const result = await getProductOne(pno);
                setProduct(result);
            } catch (error) {
                console.error("Failed to fetch product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productNo]);

    // 리뷰 데이터 가져오기
    useEffect(() => {
        const fetchReviews = async () => {
            if (!product.creatorName) {
                console.warn("Creator name is missing, cannot fetch reviews.");
                return;
            }
            setReviewLoading(true); // 로딩 상태 설정
            try {
                const reviewData = await getReviewList(1, 10, product.creatorName);
                console.log("Fetched reviews:", reviewData);
                setReviews(reviewData.dtoList || []); // 리뷰 데이터 설정
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setReviewLoading(false); // 로딩 상태 해제
            }
        };

        if (product.creatorName) {
            fetchReviews();
        }
    }, [product.creatorName]);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {loading && <LoadingPage />}
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
                </div>

                {/* 상품 정보 */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">상품명</p>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {product.productName}
                            </h2>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">상품 가격</p>
                            <p className="text-lg font-bold text-gray-800">
                                {product.productPrice.toLocaleString()}원
                            </p>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-1">카테고리</p>
                            <p className="text-lg font-bold text-gray-800">
                                {product.categoryName}
                            </p>
                        </div>

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

                        <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
                            <p className="text-sm text-gray-600 mb-1">재고 수량</p>
                            <p className="text-lg font-bold text-gray-800">
                                {product.stock > 0 ? `${product.stock}개` : "품절"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상품 설명 */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    상품 설명
                </h2>
                <p className="text-sm text-gray-700">{product.productDescription}</p>
            </div>

            {/* 고객 리뷰 */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">고객 리뷰</h2>
                {reviewLoading ? (
                    <p className="text-gray-500">리뷰를 불러오는 중입니다...</p>
                ) : reviews.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {reviews.map((review) => (
                            <li key={review.reviewNo} className="py-4">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold text-gray-700">{review.customerName}</p>
                                    <p className="text-sm text-gray-500">{review.createdAt}</p>
                                </div>
                                <p className="text-gray-600 mb-2">
                                    평점: <span className="text-yellow-500">{"⭐".repeat(review.rating)}</span>
                                </p>
                                <p className="text-sm text-gray-800">{review.comment}</p>
                                {review.reviewImages.length > 0 && (
                                    <div className="mt-2 flex space-x-2">
                                        {review.reviewImages.map((image) => (
                                            <img
                                                key={image.reviewImageNo}
                                                src={image.reviewImageUrl}
                                                alt="리뷰 이미지"
                                                className="w-20 h-20 rounded object-cover border"
                                            />
                                        ))}
                                    </div>
                                )}
                                {review.reply && (
                                    <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-2">
                                        <p className="text-sm text-blue-600 font-semibold">판매자 답변:</p>
                                        <p className="text-sm text-gray-700">{review.reply}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">아직 작성된 리뷰가 없습니다.</p>
                )}
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
