import { useState } from "react";

function DesignModeComponent() {
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [logo, setLogo] = useState<File | null>(null);
    const [layout, setLayout] = useState("layout1");

    const [previewLogo, setPreviewLogo] = useState<string | null>(null);

    const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
    const [previewBackgroundImage, setPreviewBackgroundImage] = useState<string | null>(null);

    // 로고 파일 선택 핸들러
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogo(file);

            // 로고 미리보기
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // 배경 사진 업로드 핸들러
    const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setBackgroundImage(file);

            // 배경 사진 미리보기
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewBackgroundImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // 배경색 변경 핸들러
    const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundColor(e.target.value);
    };

    // 레이아웃 선택 핸들러
    const handleLayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLayout(e.target.value);
    };

    // 저장 핸들러
    const handleSave = () => {
        console.log("저장된 디자인 설정:");
        console.log("배경색:", backgroundColor);
        console.log("로고:", logo);
        console.log("배경 사진:", backgroundImage);
        console.log("레이아웃:", layout);
        alert("디자인이 저장되었습니다!");
    };

    return (
        <div className="space-y-6 bg-gray-100 p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold">디자인 모드</h1>

            {/* 배경색 변경 */}
            <div className="space-y-2">
                <label className="block text-sm font-bold">배경색</label>
                <input
                    type="color"
                    value={backgroundColor}
                    onChange={handleBackgroundColorChange}
                    className="w-16 h-8"
                />
            </div>

            {/* 배경 사진 업로드 */}
            <div className="space-y-2">
                <label className="block text-sm font-bold">배경 사진 업로드</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageChange}
                    className="border rounded p-2 w-full"
                />
                {previewBackgroundImage && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">배경 사진 미리보기:</p>
                        <img
                            src={previewBackgroundImage}
                            alt="배경 사진 미리보기"
                            className="w-full h-48 object-cover rounded"
                        />
                    </div>
                )}
            </div>

            {/* 로고 업로드 */}
            <div className="space-y-2">
                <label className="block text-sm font-bold">로고 업로드</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="border rounded p-2 w-full"
                />
                {previewLogo && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">로고 미리보기:</p>
                        <img
                            src={previewLogo}
                            alt="로고 미리보기"
                            className="w-32 h-32 object-contain border rounded"
                        />
                    </div>
                )}
            </div>

            {/* 레이아웃 선택 */}
            <div className="space-y-2">
                <label className="block text-sm font-bold">레이아웃 선택</label>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="layout"
                            value="layout1"
                            checked={layout === "layout1"}
                            onChange={handleLayoutChange}
                        />
                        <span>레이아웃 1</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="layout"
                            value="layout2"
                            checked={layout === "layout2"}
                            onChange={handleLayoutChange}
                        />
                        <span>레이아웃 2</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="layout"
                            value="layout3"
                            checked={layout === "layout3"}
                            onChange={handleLayoutChange}
                        />
                        <span>레이아웃 3</span>
                    </label>
                </div>
            </div>

            {/* 저장 버튼 */}
            <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                저장
            </button>

            {/* 미리보기 */}
            <div
                className="mt-6 p-4 rounded shadow"
                style={{
                    backgroundColor,
                    backgroundImage: previewBackgroundImage
                        ? `url(${previewBackgroundImage})`
                        : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h2 className="text-xl font-bold mb-4 text-white">미리보기</h2>
                {previewLogo && (
                    <img
                        src={previewLogo}
                        alt="로고 미리보기"
                        className="w-32 h-32 object-contain border rounded mb-4"
                    />
                )}
                <p className="text-white">현재 레이아웃: {layout}</p>
            </div>
        </div>
    );
}

export default DesignModeComponent;
