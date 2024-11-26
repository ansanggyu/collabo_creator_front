import {Link} from "react-router-dom";


interface subMenusProps{
    name: string,
    toPath:string
}
// 타입에러 처리 - props 객체 기본 타입 지정
interface Depth2MenuProps {
    subMenus:subMenusProps[],
    basicPath:string,
}

function Depth2Menu({subMenus, basicPath}:Depth2MenuProps) {
    const menuLis = subMenus.map( (menuName,idx) => {

        const fullPath = basicPath + menuName.toPath
        return (
            <li
                className="px-2 py-1 transition-colors duration-150 rounded"
                key={idx}
            >
                <Link className="w-full block text-blue-950" to={fullPath}>{menuName.name}</Link>
            </li>
        )
    })


    return (
        <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium rounded-md bg-gray-200">
            {menuLis}
        </ul>
    );
}

export default Depth2Menu;