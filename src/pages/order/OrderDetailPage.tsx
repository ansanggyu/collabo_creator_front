import { useParams } from "react-router-dom";
import OrderDetailComponent from "../../components/order/OrderDetailComponent";

function OrderDetailPage() {
    const { id } = useParams();

    return (
        <div className="container mx-auto">
            <OrderDetailComponent orderId={id || ""} onClose={() => {}} />
        </div>
    );
}

export default OrderDetailPage;
