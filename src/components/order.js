import { useEffect, useState } from "react"
import { ORDER_URL } from "../constants/api";
import axios from "axios";

export default function Order() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await axios.get(ORDER_URL);
            setOrders(response.data);
        } catch (e) {
            console.log("Error getting order list: " + e);
            
        }
    }

    return(
        <div>
            <h4>Orders:</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Created At</th>
                        <th>Products</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        let dateTime = new Date(order.createdAt).toLocaleString();
                        return <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{dateTime}</td>
                            <td>{order.products.map(product => {
                                return <div>
                                    {product.name + ' x' + product.quantity}
                                </div>
                            })}</td>
                            <td>{order.totalPrice}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}