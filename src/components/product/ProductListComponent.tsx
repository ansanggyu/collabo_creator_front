import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductList } from "../../apis/product/productAPI.ts";
import PageComponent from "../common/PageComponent.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { IPageResponse } from "../../types/ipageresponse.ts";
import { IProductList, IUserCategory} from "../../types/iproduct.ts";
import { getCategoriesByCreator } from "../../apis/category/categoryAPI.ts";

const productStatusMapping: Record<string, number | null> = {
    "전체": null,
    "판매중": 1,
    "판매중지": 2,
    "품절": 3,
};

function ProductListComponent() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const creatorId = useSelector((state: RootState) => state.signin.creatorId);

    const [pageResponse, setPageResponse] = useState<IPageResponse<IProductList>>({
        dtoList: [],
        pageNumList: [],
        pageRequestDTO: { page: 1, size: 10 },
        prev: false,
        next: false,
        totalCount: 0,
        prevPage: 0,
        nextPage: 0,
        current: 1,
        totalPage: 1,
    });
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("전체");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [categories, setCategories] = useState<IUserCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const currentPage = Number(searchParams.get("page")) || 1;

    // 상단 통계 데이터 계산
    const statistics = {
        totalProducts: pageResponse.totalCount || 0,
        activeProducts: pageResponse.dtoList.filter((p) => p.productStatus === "판매중").length,
        inactiveProducts: pageResponse.dtoList.filter((p) => p.productStatus === "판매중지").length,
        outOfStock: pageResponse.dtoList.filter((p) => p.productStatus === "품절").length,
    };

    // 카테고리 데이터 가져오기
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

    // 상품 데이터 가져오기
    useEffect(() => {
        const fetchProducts = async (page: number = 1) => {
            setLoading(true);
            if (!creatorId || creatorId.trim() === "") {
                console.error("Redux 상태에서 creatorId를 가져오지 못했습니다.");
                setLoading(false);
                return;
            }

            try {
                const response = await getProductList(
                    page,
                    10,
                    creatorId,
                    searchQuery.trim() || undefined,
                    productStatusMapping[selectedStatus]?.toString() || undefined,
                    selectedCategory ?? undefined,

                );
                setPageResponse(response);
                console.log("상품리스트 api 반환 로그: ",response)
            } catch (error) {
                console.error("상품 데이터 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts(currentPage);
    }, [currentPage, creatorId, searchQuery, selectedStatus, selectedCategory]);

    // 상세 페이지로 이동
    const goToDetail = (productNo: number) => {
        navigate(`/product/detail/${productNo}`);
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">상품명 검색</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="상품명을 입력하세요"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                        <select
                            value={selectedCategory ?? ""}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value ? Number(e.target.value) : null)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                        >
                            <option value="">전체</option>
                            {categories.map((category) => (
                                <option key={category.categoryNo} value={category.categoryNo}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        >
                            {Object.keys(productStatusMapping).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-4 text-right">
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedStatus("전체");
                            setSelectedCategory(null);
                        }}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        필터 초기화
                    </button>
                </div>
            </div>

            {/* 상품 리스트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="col-span-3 text-center text-gray-500">로딩 중...</p>
                ) : pageResponse.dtoList.length === 0 ? (
                    <p className="col-span-3 text-center text-gray-500">상품이 없습니다.</p>
                ) : (
                    pageResponse.dtoList.map((product) => (
                        <div
                            key={product.productNo}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                {product.productImageUrl?.length > 0 ? (
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
                    ))
                )}
            </div>

            {/* 페이지네이션 */}
            {pageResponse && <PageComponent<IProductList> pageResponse={pageResponse} />}
        </div>
    );
}

export default ProductListComponent;
