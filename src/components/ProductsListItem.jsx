import React, {useContext, useEffect, useRef, useState} from "react";

export const ProductsListItem = (props) => {
  const {children}  = props;

  return (
    <li className="cell products-list__item">
      {children}
    </li>
  )
}
