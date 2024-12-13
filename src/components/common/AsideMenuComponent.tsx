import { Link } from "react-router-dom";
import Depth1Menu from "./Depth1Menu";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // 아이콘 추가

interface SubMenuProps {
    name: string;
    toPath: string;
}

interface Depth1MenuProps {
    mainName: string;
    subMenus: SubMenuProps[];
    basicPath: string;
    iconName: string;
}

function AsideMenuComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 상태 관리

    const menus: Depth1MenuProps[] = [
        {
            mainName: "상품 관리",
            subMenus: [
                { name: "상품 등록", toPath: "/add" },
                { name: "상품 리스트", toPath: "/list" },
                { name: "재고 관리", toPath: "/inventory" },
            ],
            basicPath: "/product",
            iconName: "/img/icons/product.png",
        },
        {
            mainName: "주문 관리",
            subMenus: [{ name: "주문 내역", toPath: "/list" }],
            basicPath: "/order",
            iconName: "/img/icons/order.png",
        },
        {
            mainName: "리뷰 및 QnA 관리",
            subMenus: [
                { name: "리뷰 목록", toPath: "review/list" },
                { name: "QnA 목록", toPath: "qna/list" },
            ],
            basicPath: "/",
            iconName: "/img/icons/review.png",
        },
        {
            mainName: "매출 및 통계",
            subMenus: [
                { name: "매출 그래프", toPath: "/sales" },
                { name: "상품별 매출 통계", toPath: "/products" },
                { name: "환불/취소율 통계", toPath: "/refunds" },
            ],
            basicPath: "/analytics",
            iconName: "/img/icons/analytics.png",
        },
        {
            mainName: "오프라인 매장 관리",
            subMenus: [{ name: "매장 소개", toPath: "/" }],
            basicPath: "/offlinestore",
            iconName: "/img/icons/offline.png",
        },
        {
            mainName: "설정",
            subMenus: [{ name: "My Page", toPath: "/mypage" }],
            basicPath: "/settings",
            iconName: "/img/icons/settings.png",
        },
    ];

    return (
        <div>
            {/* 네비게이션 바 - 모바일 */}
            <nav className="bg-side-navy text-white fixed top-0 left-0 w-full z-50 md:hidden">
                <div className="flex items-center justify-between p-4">
                    {/* 로고 */}
                    <Link to="/main">
                        <img src="/img/collabori.png" alt="Logo" className="w-32 h-auto" />
                    </Link>

                    {/* 메뉴 토글 버튼 */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white text-2xl focus:outline-none"
                    >
                        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>

                {/* 모바일 메뉴 */}
                {isMenuOpen && (
                    <div className="bg-side-navy text-txt-grey h-screen overflow-y-auto">
                        <ul className="mt-4 space-y-4 px-4">
                            {menus.map((menu, idx) => (
                                <li key={idx}>
                                    <Depth1Menu {...menu} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            {/* 사이드바 - 데스크톱 */}
            <aside className="hidden md:block w-64 bg-side-navy overflow-y-auto flex-shrink-0">
                <div className="py-4 text-neutral-800">
                    {/* 로고 */}
                    <Link to="/main" className="flex items-center justify-center mb-4 p-4">
                        <img src="/img/collabori.png" alt="Logo" className="w-48 h-auto" />
                    </Link>

                    {/* Depth1 메뉴 */}
                    <ul className="mt-4 space-y-2 text-txt-grey">
                        {menus.map((menu, idx) => (
                            <Depth1Menu key={idx} {...menu} />
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default AsideMenuComponent;
