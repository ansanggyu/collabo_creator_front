import { useState } from "react";

function MyPageComponent() {
    const [profile, setProfile] = useState({
        username: "홍길동",
        email: "user@example.com",
        phone: "010-1234-5678",
    });

    const [settlementInfo, setSettlementInfo] = useState({
        bankName: "",
        accountNumber: "",
    });

    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSettlementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettlementInfo({ ...settlementInfo, [name]: value });
    };

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const handleSave = () => {
        console.log("수정된 개인정보:", profile);
        console.log("저장된 정산 정보:", settlementInfo);
        console.log("저장된 설정:", settings);
        alert("모든 정보가 성공적으로 저장되었습니다.");
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 text-center">내 정보 관리</h1>

            {/* 프로필 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">프로필 관리</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                        <input
                            type="text"
                            name="username"
                            value={profile.username}
                            onChange={handleProfileChange}
                            placeholder="이름을 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            placeholder="이메일 주소를 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                        <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            placeholder="전화번호를 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* 정산 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">정산 정보 관리</h2>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">은행명</label>
                        <input
                            type="text"
                            name="bankName"
                            value={settlementInfo.bankName}
                            onChange={handleSettlementChange}
                            placeholder="은행명을 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">계좌번호</label>
                        <input
                            type="text"
                            name="accountNumber"
                            value={settlementInfo.accountNumber}
                            onChange={handleSettlementChange}
                            placeholder="계좌번호를 입력하세요"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* 개인 설정 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">개인 설정</h2>
                <div className="flex flex-col space-y-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={() => toggleSetting("emailNotifications")}
                            className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-3 text-gray-700">이메일 알림 받기</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.smsNotifications}
                            onChange={() => toggleSetting("smsNotifications")}
                            className="h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-3 text-gray-700">SMS 알림 받기</span>
                    </label>
                </div>
            </div>

            {/* 저장 버튼 */}
            <div className="text-center">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    저장
                </button>
            </div>
        </div>
    );
}

export default MyPageComponent;
