import React, { useState, useEffect } from "react";
import { getCategoriesByCreator, addCategory } from "../../apis/category/categoryAPI";
import { IUserCategory } from "../../types/iproduct";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AddCategoryComponent: React.FC = () => {
    const [categoryName, setCategoryName] = useState<string>(""); // 새로운 카테고리 이름
    const [categories, setCategories] = useState<IUserCategory[]>([]); // 기존 카테고리 목록
    const creatorId = useSelector((state: RootState) => state.signin.creatorId); // Redux에서 creatorId 가져오기

    // 기존 카테고리 가져오기
    useEffect(() => {
        const fetchCategories = async () => {
            if (!creatorId) return; // creatorId가 없으면 실행하지 않음
            try {
                const result = await getCategoriesByCreator(creatorId);
                setCategories(result);
            } catch (error) {
                console.error("카테고리 불러오기 실패:", error);
            }
        };

        fetchCategories();
    }, [creatorId]);

    // 카테고리 추가 핸들러
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            alert("카테고리 이름을 입력해주세요.");
            return;
        }

        try {
            const newCategory = await addCategory(creatorId, categoryName); // API 호출
            setCategories((prev) => [...prev, newCategory]); // 상태 업데이트
            setCategoryName(""); // 입력 초기화
            alert("카테고리가 추가되었습니다!");
        } catch (error) {
            console.error("카테고리 추가 실패:", error);
            alert("카테고리 추가에 실패했습니다.");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">카테고리 관리</h1>

            {/* 카테고리 추가 폼 */}
            <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">카테고리 이름</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="카테고리 이름을 입력하세요"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    추가
                </button>
            </form>

            {/* 카테고리 목록 */}
            <h2 className="text-xl font-bold mt-6 mb-4">등록된 카테고리</h2>
            <ul className="space-y-2">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <li
                            key={category.categoryNo}
                            className="flex justify-between items-center p-2 border rounded-lg bg-gray-50"
                        >
                            <span>{category.categoryName}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">등록된 카테고리가 없습니다.</p>
                )}
            </ul>
        </div>
    );
};

export default AddCategoryComponent;
