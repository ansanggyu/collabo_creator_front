import MyPageComponent from "../../components/settings/MyPageComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function MyPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto p-4">
                <MyPageComponent/>
            </div>
        </BasicLayout>
    );
}

export default MyPage;
