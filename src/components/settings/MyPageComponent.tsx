import { useState } from "react";

function MyPageComponent() {
    // 상태 관리
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

    // 개인정보 수정 핸들러
    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // 정산 정보 수정 핸들러
    const handleSettlementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettlementInfo({ ...settlementInfo, [name]: value });
    };

    // 개인 설정 변경 핸들러
    const toggleSetting = (key: keyof typeof settings) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    // 저장 핸들러
    const handleSave = () => {
        console.log("수정된 개인정보:", profile);
        console.log("저장된 정산 정보:", settlementInfo);
        console.log("저장된 설정:", settings);
        alert("모든 정보가 성공적으로 저장되었습니다.");
    };

    return (
        <div className="space-y-8">
            {/* 프로필 정보 관리 */}
            <form className="space-y-4 bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">프로필 관리</h1>
                <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleProfileChange}
                    placeholder="이름"
                    className="border rounded p-2 w-full"
                />
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    placeholder="이메일"
                    className="border rounded p-2 w-full"
                />
                <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    placeholder="전화번호"
                    className="border rounded p-2 w-full"
                />
            </form>

            {/* 정산 정보 관리 */}
            <form className="space-y-4 bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">정산 정보 관리</h1>
                <input
                    type="text"
                    name="bankName"
                    value={settlementInfo.bankName}
                    onChange={handleSettlementChange}
                    placeholder="은행명"
                    className="border rounded p-2 w-full"
                />
                <input
                    type="text"
                    name="accountNumber"
                    value={settlementInfo.accountNumber}
                    onChange={handleSettlementChange}
                    placeholder="계좌번호"
                    className="border rounded p-2 w-full"
                />
            </form>

            {/* 개인 설정 */}
            <div className="bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">개인 설정</h1>
                <div className="space-y-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={() => toggleSetting("emailNotifications")}
                            className="mr-2"
                        />
                        이메일 알림 받기
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.smsNotifications}
                            onChange={() => toggleSetting("smsNotifications")}
                            className="mr-2"
                        />
                        SMS 알림 받기
                    </label>
                </div>
            </div>

            {/* 저장 버튼 */}
            <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                저장
            </button>
        </div>
    );
}

export default MyPageComponent;
