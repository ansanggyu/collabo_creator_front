import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { IProduct, IUserCategory } from "../../types/iproduct";
import { getProductList } from "../../apis/product/productAPI";
import { IPageResponse } from "../../types/ipageresponse";
import PageComponent from "../common/PageComponent.tsx";
import LoadingPage from "../../pages/LoadingPage.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import {getCategoriesByCreator} from "../../apis/category/categoryAPI.ts";

const productStatusMapping: Record<string, number | null> = {
    "전체": null,
    "판매중": 1,
    "판매중지": 2,
    "품절": 3,
};

const initialState: IPageResponse<IProduct> = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: { page: 1, size: 10 },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    current: 1,
    totalPage: 0,
};

function InventoryComponent() {
    const [query] = useSearchParams();
    const creatorId = useSelector((state: RootState) => state.signin.creatorId);

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [pageResponse, setPageResponse] = useState<IPageResponse<IProduct>>(initialState);
    const [categories, setCategories] = useState<IUserCategory[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(""); // 상품명 검색
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // 카테고리 필터
    const [selectedStatus, setSelectedStatus] = useState<string>("전체"); // 상태 필터

    const queryStr = createSearchParams({ page: String(page), size: String(size) });
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    // 상품 상세 페이지 이동
    const moveToRead = (productNo: number | undefined) => {
        navigate({
            pathname: `/product/detail/${productNo}`,
            search: `${queryStr}`,
        });
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
        if (!creatorId || creatorId.trim() === "") {
            console.error("Redux 상태에서 creatorId를 가져오지 못했습니다.");
            return;
        }

        setLoading(true);
        getProductList(
            page,
            size,
            creatorId,
            searchQuery.trim() || undefined,
            productStatusMapping[selectedStatus]?.toString() || undefined,
            selectedCategory ?? undefined
        )
            .then((data) => {
                setPageResponse(data);

                setTimeout(() => {
                    setLoading(false);
                }, 400);
            })
            .catch((error) => {
                console.error("상품 데이터 불러오기 실패:", error);
                setLoading(false);
            });
    }, [page, size, creatorId, searchQuery, selectedStatus, selectedCategory]);

    // 상품 리스트 요소 생성
    const productListLI = pageResponse.dtoList.map((product: IProduct) => {
        const { productNo, categoryName, productName, createdAt, stock } = product;

        return (
            <li
                key={productNo}
                className="grid grid-cols-5 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                onClick={() => moveToRead(product.productNo)}
            >
                <span className="text-gray-900 dark:text-gray-300">{productNo}</span>
                <span className="text-gray-900 dark:text-gray-300">{categoryName}</span>
                <span className="text-gray-900 dark:text-gray-300">{productName}</span>
                <span className="text-gray-900 dark:text-gray-300">{createdAt || "날짜 없음"}</span>
                <span className="text-gray-900 dark:text-gray-300">{stock}</span>
            </li>
        );
    });

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* 검색 조건 섹션 */}
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
                            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
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
            {loading && <LoadingPage />}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="min-w-full leading-normal">
                        <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                            <span>상품번호</span>
                            <span>카테고리</span>
                            <span>상품명</span>
                            <span>등록일</span>
                            <span>재고</span>
                        </div>
                        <ul>{productListLI}</ul>
                    </div>
                </div>
            </div>

            {/* 페이지 컴포넌트 */}
            <PageComponent pageResponse={pageResponse}></PageComponent>
        </div>
    );
}

export default InventoryComponent;
