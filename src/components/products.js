import axios from "axios";
import React, { useEffect, useState } from "react";
import { PRODUCT_URL } from "../constants/api";
import './products.css';

export default function Products() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await axios.get(PRODUCT_URL);
        
            setProducts(response.data);
        } catch (e) {
            console.log("Error getting products: " + e)
        }
    }

    return (
        <div>
            <h4>Products: </h4>
            <div className="border border-primary p-2 scrollable-area">{
                products.map((e, index) => {
                    return <div className="border border-success m-3 p-2">
                        <div>Name: {e.name}</div>
                        <div>Type: {e.type}</div>
                        <div>Price: {e.price}</div>
                        <div>Quantity: </div>
                    </div>
                })
            }
            </div>
        </div>
    )
}