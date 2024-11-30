import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { IProduct } from "../../types/iproduct";
import { getProductList } from "../../apis/product/productAPI";
import { IPageResponse } from "../../types/ipageresponse";
import PageComponent from "../common/PageComponent.tsx";
import LoadingPage from "../../pages/LoadingPage.tsx";

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

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [pageResponse, setPageResponse] = useState<IPageResponse<IProduct>>(initialState)

    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)

    // 상품 상세 페이지 이동
    const moveToRead = (productNo: number | undefined) => {
        navigate({
            pathname: `/product/detail/${productNo}`,
            search: `${queryStr}`,
        });
    };

    useEffect(() => {
        setLoading(true)
        getProductList(page, size).then(data => {
            setPageResponse(data)

            setTimeout(() => {
                setLoading(false)
            }, 400)
        })
    }, [page, size])

    // 상품 리스트 요소 생성
    const productListLI = pageResponse.dtoList.map((product: IProduct) => {

        const {productNo, categoryName, productName, createdAt , stock} = product

        return(
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
        )
    })

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* 검색 조건 섹션 */}
            <div className="flex flex-col space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="상품명 검색"
                   //value={searchTerm}
                    //onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex space-x-4 items-center">
                    <input
                        type="date"
                        //value={dateRange.start}
                        //onChange={(e: ChangeEvent<HTMLInputElement>) =>
                         //   setDateRange((prev) => ({ ...prev, start: e.target.value }))
                        //}
                        className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span>~</span>
                    <input
                        type="date"
                        // value={dateRange.end}
                        // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        //     setDateRange((prev) => ({ ...prev, end: e.target.value }))
                        // }
                        className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* 상품 리스트 */}
            {loading && <LoadingPage></LoadingPage>}
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
};

export default InventoryComponent;
