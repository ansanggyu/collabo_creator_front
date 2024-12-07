import { Link } from "react-router-dom";
import Depth1Menu from "./Depth1Menu";

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
        <aside className="z-20 hidden w-64 overflow-y-auto bg-side-navy md:block flex-shrink-0">
            <div className="py-4 text-neutral-800">
                {/* 로고 및 대시보드 메뉴 */}
                <Link to="/main" className="flex items-center justify-center mb-4 p-2">
                    <img src="/img/logo.png" alt="Logo" className="px-16" />
                </Link>
                {/* Depth1 메뉴 */}
                <ul className="mt-4 space-y-2 text-txt-grey">
                    {menus.map((menu, idx) => (
                        <Depth1Menu key={idx} {...menu} />
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default AsideMenuComponent;
