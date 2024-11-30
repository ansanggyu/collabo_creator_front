import React, { useEffect, useState, useCallback, ChangeEvent } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { IProduct, IDateRange, ISortConfig } from "../../types/iproduct";
import { getProductList } from "../../apis/product/productAPI";
import { IPageResponse } from "../../types/ipageresponse";
import PageComponent from "../common/PageComponent.tsx";

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

const InventoryComponent: React.FC = () => {
    const [query] = useSearchParams();
    const [pageResponse, setPageResponse] = useState<IPageResponse<IProduct>>(initialState);

    // 검색 조건 상태
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filter, setFilter] = useState<"all" | "low-stock" | "out-of-stock">("all");
    const [dateRange, setDateRange] = useState<IDateRange>({ start: "", end: "" });
    const [sortConfig, setSortConfig] = useState<ISortConfig>({ key: "", direction: "asc" });

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    const navigate = useNavigate();

    // 상품 상세 페이지 이동
    const moveToRead = (productNo: number | undefined) => {
        navigate({
            pathname: `/product/read/${productNo}`,
            search: `${queryStr}`,
        });
    };

    // 상품 데이터 가져오기
    const fetchProducts = useCallback(async () => {
        try {
            const pageData: IPageResponse<IProduct> = await getProductList(page, size);
            setPageResponse(pageData);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    }, [page, size]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // 날짜 범위 확인 함수
    const isWithinDateRange = (productDate: string): boolean => {
        if (!dateRange.start && !dateRange.end) return true;

        const date = new Date(productDate);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        if (startDate && date < startDate) return false;
        if (endDate && date > endDate) return false;
        return true;
    };

    // 정렬 처리 함수
    const handleSort = (key: keyof IProduct) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const getSortArrow = (key: keyof IProduct) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? "↑" : "↓";
        }
        return "↕";
    };

    // 필터링된 데이터 생성
    const filteredProducts = pageResponse.dtoList.filter((product) => {
        const matchesSearch = product.productName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = product.createdAt ? isWithinDateRange(product.createdAt) : true;

        if (filter === "low-stock") return product.stock! > 0 && product.stock! <= 5 && matchesSearch && matchesDate;
        if (filter === "out-of-stock") return product.stock === 0 && matchesSearch && matchesDate;
        return matchesSearch && matchesDate;
    });

    // 상품 리스트 요소 생성
    const productListItems = filteredProducts.map((product) => (
        <li
            key={product.productNo}
            className="grid grid-cols-5 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
            onClick={() => moveToRead(product.productNo)}
        >
            <span className="text-gray-900 dark:text-gray-300">{product.productNo}</span>
            <span className="text-gray-900 dark:text-gray-300">{product.categoryNo}</span>
            <span className="text-gray-900 dark:text-gray-300">{product.productName}</span>
            <span className="text-gray-900 dark:text-gray-300">{product.createdAt || "날짜 없음"}</span>
            <span className="text-gray-900 dark:text-gray-300">{product.stock}</span>
        </li>
    ));

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* 검색 조건 섹션 */}
            <div className="flex flex-col space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="상품명 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex space-x-4 items-center">
                    <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDateRange((prev) => ({ ...prev, start: e.target.value }))
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span>~</span>
                    <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDateRange((prev) => ({ ...prev, end: e.target.value }))
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* 상품 리스트 */}
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
                        <ul>{productListItems}</ul>
                    </div>
                </div>
            </div>

            {/* 페이지 컴포넌트 */}
            <PageComponent pageResponse={pageResponse}></PageComponent>
        </div>
    );
};

export default InventoryComponent;
