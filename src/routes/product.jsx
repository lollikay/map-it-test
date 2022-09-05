import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import DataContext from "../js/context";
import ProductDetailed from "../components/product-detailed";

export default function Product(props) {
  let params = useParams();
  const productId = params.id;
  const {products, setProducts} = useContext(DataContext);

  const getProduct = (products, id) => {
    if(products.length < 1 || typeof id === "undefined") return {}
    const product = products.find((item) => item.id.toString() === id.toString());
    return product;
  }

  const product = getProduct(products, productId);

  const handleProductUpdate = (newProp) => {
    setProducts(products.map((item) => {
      if(item.id.toString() === productId.toString()) {
        return ({
          ...item,
          ...newProp
        })
      } else {
        return item
      }
    }));
  }

  return (
    <ProductDetailed
      product={product}
      updater={handleProductUpdate}
    />
  )
}