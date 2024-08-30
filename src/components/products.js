import axios from "axios";
import React, { useEffect, useState } from "react";
import { PRODUCT_URL } from "../constants/api";
import './products.css';
import { Field, Form, Formik } from "formik";

export default function Products(props) {
    const { products, onAddToCart } = props;

    return (
        <div>
            <h4>Products: </h4>
            <div className="border border-primary p-2 scrollable-area">{
                products.map((e, index) => {
                    return <div className="border border-success m-3 p-2">
                        <div>Name: {e.name}</div>
                        <div>Type: {e.type}</div>
                        <div>Price: {e.price}</div>
                        <Formik
                            initialValues={{ number: 0 }}
                            onSubmit={(values, {resetForm}) => {
                                onAddToCart(e.id, values.number);
                                resetForm({ values: { number: 0 } });
                            }}
                            >
                            {({ isSubmitting }) => (
                                <Form>
                                <div className="mt-2 mb-2">
                                    <label className={"mr-3"}htmlFor="number">Quantity</label>
                                    <Field
                                        type="number"
                                        id="number"
                                        name="number"
                                    />
                                </div>
                                <button className={"btn btn-primary mt-2"}type="submit" disabled={isSubmitting}>
                                    Add To Cart
                                </button>
                                </Form>
                            )}
                            </Formik>
                    </div>
                })
            }
            </div>
        </div>
    )
}