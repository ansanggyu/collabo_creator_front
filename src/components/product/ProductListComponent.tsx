import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductList } from "../../apis/product/productAPI.ts";
import { IProduct } from "../../types/iproduct.ts";
import PageComponent from "../common/PageComponent.tsx";
import {IPageResponse} from "../../types/ipageresponse.ts"; // 페이지 컴포넌트 import

function ProductListComponent() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // 상태 관리
    const [pageResponse, setPageResponse] = useState<IPageResponse<IProduct> | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("전체");
    const [selectedCategory, setSelectedCategory] = useState("전체");

    // 현재 페이지 가져오기
    const currentPage = Number(searchParams.get("page")) || 1;

    // API 호출
    const fetchProducts = async (page: number = 1) => {
        try {
            const response: IPageResponse<IProduct> = await getProductList(page);
            setPageResponse(response);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    // 통계 계산
    const statistics = {
        totalProducts: pageResponse?.totalCount || 0,
        activeProducts: pageResponse?.dtoList.filter((p) => p.productStatus === "판매중").length || 0,
        inactiveProducts: pageResponse?.dtoList.filter((p) => p.productStatus === "판매중지").length || 0,
        outOfStock: pageResponse?.dtoList.filter((p) => p.stock === 0).length || 0,
    };

    // 필터링된 상품 계산
    const filteredProducts =
        pageResponse?.dtoList.filter((product) => {
            const matchesSearch = product.productName.includes(searchQuery);
            const matchesStatus =
                selectedStatus === "전체" || product.productStatus === selectedStatus;
            const matchesCategory =
                selectedCategory === "전체" || product.categoryName === selectedCategory;
            return matchesSearch && matchesStatus && matchesCategory;
        }) || [];

    const goToDetail = (id: number) => {
        navigate(`/product/detail/${id}`);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* 상단 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700">전체 상품</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.totalProducts}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700">판매중</p>
                    <p className="text-2xl font-bold text-green-500">{statistics.activeProducts}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700">판매중지</p>
                    <p className="text-2xl font-bold text-red-500">{statistics.inactiveProducts}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-gray-700">품절</p>
                    <p className="text-2xl font-bold text-orange-500">{statistics.outOfStock}</p>
                </div>
            </div>

            {/* 검색 조건 */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            상품명 검색
                        </label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="상품명을 입력하세요"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            카테고리
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="전체">전체</option>
                            {/* 필요 시 백엔드에서 카테고리 목록을 가져와 사용 */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            상태
                        </label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        >
                            <option value="전체">전체</option>
                            <option value="판매중">판매중</option>
                            <option value="판매중지">판매중지</option>
                            <option value="품절">품절</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 text-right">
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedStatus("전체");
                            setSelectedCategory("전체");
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        필터 초기화
                    </button>
                </div>
            </div>

            {/* 상품 리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.productNo}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            {product.productImageUrl.length > 0 ? (
                                <img
                                    src={product.productImageUrl[0]}
                                    alt={product.productName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-xl">이미지 없음</span>
                            )}
                        </div>
                        <div className="p-4 space-y-2">
                            <h2 className="text-xl font-semibold text-gray-900">{product.productName}</h2>
                            <div className="flex items-center space-x-2">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                        product.productStatus === "판매중"
                                            ? "bg-green-100 text-green-700"
                                            : product.productStatus === "품절"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {product.productStatus}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-700">재고수량:</span>{" "}
                                {product.stock > 0 ? `${product.stock}개` : "품절"}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-700">판매가:</span>{" "}
                                {product.productPrice.toLocaleString()}원
                            </p>
                        </div>
                        <div className="p-4 border-t">
                            <button
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={() => goToDetail(product.productNo)}
                            >
                                상세 보기
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            {pageResponse && <PageComponent<IProduct> pageResponse={pageResponse} />}
        </div>
    );
}

export default ProductListComponent;
