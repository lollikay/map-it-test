import "./style.pcss";
import {getLocaleMsg} from "../../js/utils/getLocaleMsg";
import React, {useContext} from "react";
import DataContext from "../../js/context";
import {Link} from "react-router-dom";

export const ProductCard = (props) => {
  const {product} = props;
  const {lang} = useContext(DataContext);

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__image">
        {(product.imagePath.length > 0) &&
          <img src={product.imagePath} alt={product.name} width="200" height="200" loading="lazy" />
        }
      </Link>
      <div className="product-card__text">
        <div className="product-card__article">
          {getLocaleMsg("ARTICLE", lang)}: {product.code}
        </div>
        <div className="product-card__title">
          {product.name}
        </div>
      </div>
      <div className="product-card__action">
        <Link to={`/products/${product.id}`} className="btn">
          {getLocaleMsg("VIEW_DETAILED", lang)}
        </Link>
      </div>
    </article>
  )
}