import { Link } from "react-router-dom";

interface SubMenuProps {
    name: string;
    toPath: string;
}

interface Depth2MenuProps {
    subMenus: SubMenuProps[];
    basicPath: string;
}

function Depth2Menu({ subMenus, basicPath }: Depth2MenuProps) {
    const menuLis = subMenus.map((menu, idx) => {
        const fullPath = basicPath + menu.toPath;

        return (
            <li
                className="px-2 py-1 transition-colors duration-150 rounded"
                key={idx}
            >
                <Link className="w-full block text-blue-950" to={fullPath}>
                    {menu.name}
                </Link>
            </li>
        );
    });

    return (
        <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium rounded-md bg-gray-200">
            {menuLis}
        </ul>
    );
}

export default Depth2Menu;
