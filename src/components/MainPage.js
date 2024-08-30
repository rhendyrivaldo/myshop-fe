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
    
    const [page, setPage] = useState(0);
    
    const pageSize = 4;

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await axios.get(PRODUCT_URL, {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            });

            const data = response.data.content;
        
            setProducts([...products, ...data]);
            let idToProductsMap = data.reduce((map, product) => {
                map[product.id] = product
                return map;
            }, {productIdToProductsMap});
            setProductIdToProductsMap({productIdToProductsMap, ...idToProductsMap,});
        } catch (e) {
            console.log("Error getting products: " + e)
        }
    }

    const onLoadMoreProduct = () => {
        setPage(page + 1);
        loadProducts();
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
                            onLoadMoreProduct={onLoadMoreProduct}
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