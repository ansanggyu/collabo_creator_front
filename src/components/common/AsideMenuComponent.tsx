import { Link } from "react-router-dom";
import Depth1Menu from "./Depth1Menu";
import logo from "../../assets/img/logo.png";

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
            iconName: "product.png",
        },
        {
            mainName: "주문 관리",
            subMenus: [
                { name: "주문 내역", toPath: "/list" },
                { name: "환불 처리", toPath: "/refund" },
            ],
            basicPath: "/order",
            iconName: "order.png",
        },
        {
            mainName: "리뷰 및 피드백 관리",
            subMenus: [
                { name: "리뷰 목록", toPath: "/list" },
                { name: "리뷰 답변", toPath: "/reply/:id" },
            ],
            basicPath: "/review",
            iconName: "review.png",
        },
        {
            mainName: "매출 및 통계",
            subMenus: [
                { name: "매출 그래프", toPath: "/sales" },
                { name: "상품별 매출 통계", toPath: "/products" },
            ],
            basicPath: "/analytics",
            iconName: "analytics.png",
        },
        {
            mainName: "상품 카테고리 관리",
            subMenus: [
                { name: "카테고리 추가", toPath: "/add" },
                { name: "카테고리 수정", toPath: "/edit/:id" },
            ],
            basicPath: "/category",
            iconName: "category.png",
        },
        {
            mainName: "오프라인 매장 관리",
            subMenus: [{ name: "매장 소개", toPath: "/blog" }],
            basicPath: "/offline",
            iconName: "offline.png",
        },
        {
            mainName: "설정",
            subMenus: [
                { name: "프로필 관리", toPath: "/profile" },
                { name: "정산 정보 관리", toPath: "/settlement" },
                { name: "알림 설정", toPath: "/notifications" },
            ],
            basicPath: "/settings",
            iconName: "settings.png",
        },
    ];

    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-side-navy md:block flex-shrink-0">
            <div className="py-4 text-neutral-800">
                {/* 로고 및 대시보드 메뉴 */}
                <Link to="/" className="flex items-center justify-center mb-4 p-2">
                    <img src={logo} alt="Logo" className="px-16" />
                </Link>
                <ul className="mt-1 space-y-2 text-txt-grey">
                    <li className="relative px-6 py-3">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm font-semibold text-blue-950"
                        >
                            <img
                                src="/src/assets/img/icons/dashboard.png"
                                alt="Dashboard Icon"
                                className="w-5 h-5"
                            />
                            <span className="ml-4">대시보드</span>
                        </Link>
                    </li>
                </ul>
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
