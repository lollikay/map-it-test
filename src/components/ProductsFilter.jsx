import React, {useContext, useState} from "react";
import {getLocaleMsg} from "../js/utils/getLocaleMsg";
import DataContext from "../js/context";

export const ProductsFilter = (props) => {
  const {filterUpdater} = props;
  const [productFilter, setProductFilter] = useState("");
  const {lang} = useContext(DataContext);

  const handleInputChange = (e) => {
    const {target} = e;
    setProductFilter(target.value);
    filterUpdater(target.value);
  }

  return (
    <div className="form search-form">
      <label className="form__field">
        <span className="form__label">
          {getLocaleMsg("SEARCH_PRODUCTS", lang)}
        </span>
        <input
          type="text"
          className="form__input"
          placeholder={getLocaleMsg("SEARCH_PRODUCTS_PLACEHOLDER", lang)}
          value={productFilter}
          onChange={handleInputChange}
        />
      </label>
    </div>
  )
}