import { useState } from "react";
import Depth2Menu from "./Depth2Menu";

const ChevronDown = () => (
    <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
);

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

function Depth1Menu({ mainName, subMenus, basicPath, iconName }: Depth1MenuProps) {
    const [isToggle, setIsToggle] = useState(false);

    const isToggleOpen = () => setIsToggle(!isToggle);

    const iconPath = `${iconName}`;

    return (
        <li className="relative px-6 py-3">
            <button
                onClick={isToggleOpen}
                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-neutral-800"
            >
                <img src={iconPath} alt={`${mainName} Icon`} className="w-5 h-5" />
                <span className="inline-flex items-center">
                    <span className="ml-4 text-blue-950">{mainName}</span>
                </span>
                <span
                    className={`transition-transform duration-200 ${isToggle ? "transform rotate-180" : ""}`}
                >
                    <ChevronDown />
                </span>
            </button>
            {isToggle && <Depth2Menu subMenus={subMenus} basicPath={basicPath} />}
        </li>
    );
}

export default Depth1Menu;
