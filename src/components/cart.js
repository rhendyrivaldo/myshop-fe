import { useEffect, useState } from "react"
import { ORDER_URL } from "../constants/api";
import axios from "axios";

export default function Cart(props) {
    const {productIdToQuantityMap, productIdToProductsMap, resetCart} = props;
    const [checkAll, setCheckAll] = useState(true);
    const [selectedProductIds, setSelectedProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setSelectedProducts(Object.keys(productIdToQuantityMap))
    }, [productIdToQuantityMap])

    useEffect(() => {
        let totalPrice = 0;
        selectedProductIds.forEach((productId, index) => {
            let product = productIdToProductsMap[productId];
            let qty = productIdToQuantityMap[productId];

            totalPrice += qty * product.price;
        })
        setTotalPrice(totalPrice);
    }, [selectedProductIds])

    const handleCheckAllClick = (value) => {
        setCheckAll(!checkAll);
        if (value === false) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(Object.keys(productIdToQuantityMap));
        }
    }

    const handleProductCheckClick = (productId, event) => {
        if(event.target.checked) {
            let newSelected = [...selectedProductIds, productId];
            setSelectedProducts(newSelected);
        } else {
            let newSelected = selectedProductIds.filter(e => e !== productId);
            setSelectedProducts(newSelected);
        }
    }

    const onCreateOrder = async () => {
        try {
            let selectedProductsWithQuantity = Object.fromEntries(
                Object.entries(productIdToQuantityMap).filter(([key]) => selectedProductIds.includes(key))
            );
            const response = await axios.post(ORDER_URL, selectedProductsWithQuantity);
            resetCart();
            
        } catch (e) {
            console.log("Error creating order: " + e);
            
        }
    }

    return(
        <div>
            <h4>Cart:</h4>
            {Object.keys(productIdToQuantityMap).length > 0 && <div className="border border-primary p-2 scrollable-area">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>
                            <input
                                type="checkbox"
                                checked={checkAll}
                                onChange={() => handleCheckAllClick(!checkAll)}
                            />
                            </th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(productIdToQuantityMap).map(([key, value]) => {
                            let product = productIdToProductsMap[key];
                            return <tr key={key}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProductIds.includes(key) || false}
                                        onChange={(event) => handleProductCheckClick(key, event)}
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.type}</td>
                                <td>{product.price}</td>
                                <td>{value}</td>
                                <td>{value * product.price}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <h6>Total: {totalPrice}</h6>
                <button className="btn btn-primary" onClick={() => onCreateOrder()}>
                    Place Order
                </button>
            </div>}
        </div>
    )
}