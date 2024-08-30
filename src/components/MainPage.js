import React, { useEffect, useState } from "react";
import Products from "./products";
import './MainPage.css';
import Cart from "./cart";
import Order from "./order";
import axios from "axios";
import { PRODUCT_URL } from "../constants/api";

export default function MainPage() {
    const [products, setProducts] = useState([]);
    const [productIdToQuantityMap, setProductIdToQuantityMap] = useState({});
    const [productIdToProductsMap, setProductIdToProductsMap] = useState({});
    
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await axios.get(PRODUCT_URL);
        
            setProducts(response.data);
            let idToProductsMap = response.data.reduce((map, product) => {
                map[product.id] = product
                return map;
            }, {productIdToProductsMap});
            setProductIdToProductsMap(idToProductsMap);
        } catch (e) {
            console.log("Error getting products: " + e)
        }
    }

    const onAddToCart = (productId, quantity) => {
        if (quantity === 0) return;

        setProductIdToQuantityMap(prevData => ({
            ...prevData,
            [productId]: quantity,
        }));
    }

    const resetCart = () => {
        setProductIdToQuantityMap([]);
    }

    return (
        <div>
            <div className="text-center">
                <h2>
                    Welcome to Myshop
                </h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <Products
                            products={products}
                            onAddToCart={onAddToCart}
                        />
                    </div>
                    <div className="col-md-8">
                        <Cart
                            productIdToQuantityMap={productIdToQuantityMap}
                            productIdToProductsMap={productIdToProductsMap}
                            resetCart={resetCart}
                        />
                    </div>
                </div>
                <div className="row">
                    <Order></Order>
                </div>
            </div>
        </div>
    );
}