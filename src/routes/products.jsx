import React, {useContext, useState, Suspense} from 'react';
import {ProductsList} from "../components/ProductsList";
import {ProductsFilter} from "../components/ProductsFilter";
import DataContext from "../js/context";

export default function Products(props) {
  const {products, setProducts} = useContext(DataContext);
  const [productsFilter, setProductsFilter] = useState("");
  const handleFilterUpdate = (newValue) => {
    setProductsFilter(newValue);
  }
  const handleListUpdate = (newArray) => {
    setProducts(newArray);
  }

  return (
    <div className="products">
      <div className="products__filter">
        <ProductsFilter
          filterUpdater={handleFilterUpdate}
        />
      </div>
      <ProductsList
        products={products}
        filter={productsFilter}
        updater={handleListUpdate}
      />
    </div>
  );
}
