import React from "react";
import Products from "./products";
import './MainPage.css';
import Cart from "./cart";
import Order from "./order";

export default function MainPage() {
    return (
        <div>
            <h2>
                Welcome to Myshop
            </h2>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <Products></Products>
                    </div>
                    <div className="col-md-6">
                        <Cart></Cart>
                    </div>
                </div>
                <div className="row">
                    <Order></Order>
                </div>
            </div>
        </div>
    );
}