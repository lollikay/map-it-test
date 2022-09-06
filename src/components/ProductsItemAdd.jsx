import React, {useContext, useEffect, useRef, useState} from "react";
import DataContext from "../js/context";
import {getLocaleMsg} from "../js/utils/getLocaleMsg";

export const ProductsItemAdd = (props) => {
  const {itemAdder, id}  = props;
  // console.debug(id)
  const {lang} = useContext(DataContext);
  const handleProductAdd = () => {
    itemAdder({
      "id": id,
      "code": "art0000",
      "name": "title",
      "isActive": true,
      "descr": "",
      "isSale": false,
      "inStock": true,
      "isPurchased": false,
      "barcode": "0000",
      "manageItemBy": 1,
      "minimumInventory": 1.0,
      "maximumInventory": 10.00,
      "remarks": "",
      "imagePath": ""
    })
  }

  return (
    <div className="product-card product-card--action">
      <div className="product-card__action">
        <button className="btn" onClick={handleProductAdd} title={getLocaleMsg("ADD_PRODUCT", lang)}>
          +
        </button>
      </div>
    </div>
  )
}
