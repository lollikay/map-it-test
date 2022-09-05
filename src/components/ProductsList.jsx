import React, {useContext, useEffect, useRef, useState} from "react";
import {ProductsListItem} from "./ProductsListItem";
import {ProductsItemAdd} from "./ProductsItemAdd";
import {ProductCard} from "./product-card";

export const ProductsList = (props) => {
  const { products, filter, updater }  = props;
  // console.debug(products)
  const filterString = filter.toLowerCase();

  const getNextProductId = (products) => {
    if(typeof products === "undefined" || products.length < 1) return 0;
    const ids = products.map((product) => product.id);
    const nextId = ids.sort((a, b) => {
      if( a === Infinity )
        return 1;
      else if( isNaN(a))
        return -1;
      else
        return a - b;
    }).pop();
    return Number(nextId) + 1;
  }

  const handleItemAdd = (item) => {
    updater([
      ...products,
      item
    ]);
  }

  const filterOutProduct = (product) => {
    if(filterString.length < 1) {
      return true;
    }
    if(product.code.toLowerCase().includes(filterString) || product.name.toLowerCase().includes(filterString)) {
      return true;
    }
    return false;
  }

  return (
    <ul className="cells products-list">
      { Array.isArray(products) &&
        products
          .filter((product) => filterOutProduct(product))
          .map((product, i) => {
            return (
              <ProductsListItem
                key={`product-item-${i}`}
              >
                <ProductCard
                  product={product}
                />
              </ProductsListItem>
            )
          })
      }
      <ProductsListItem>
        <ProductsItemAdd
          id={getNextProductId(products)}
          itemAdder={handleItemAdd}
        />
      </ProductsListItem>
    </ul>
  )
}
