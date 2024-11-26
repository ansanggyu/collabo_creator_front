import OrderListComponent from "../../components/order/OrderListComponent";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function OrderListPage() {
    return (
        <BasicLayout>
            <div className="container mx-auto">
                <OrderListComponent />
            </div>
        </BasicLayout>
    );
}

export default OrderListPage;
