import "./style.pcss";

import React, {useContext, useState} from "react";
import {getByPropFromObj} from "../../js/utils/getByPropFromObj";
import DataContext from "../../js/context";
import {getLocaleMsg} from "../../js/utils/getLocaleMsg";
import Select from "../Select";
import FormField from "../FormField";
import { useNavigate } from 'react-router-dom';
import FileUpload from "../file-upload";

const ProductDetailed = (props) => {
  const {product = {}, updater} = props;
  const [imagePath, setImagePath] = useState(product.imagePath || "");
  const {lang, products, setProducts} = useContext(DataContext);
  let navigate = useNavigate();

  const handleUpdateProperty = (target) => {
    const propName = target.getAttribute("name");
    if(propName) {
      // console.debug(target.value)
      updater({
        [propName]: target.value
      });
    } else {
      console.debug("Unable to update property. No property name specified for element");
      console.debug(target)
    }
  }

  const handleUpdateBoolProperty = (e) => {
    const {target} = e;
    // console.debug(target);
    const property = target.name;
    updater({
      [property]: target.checked
    });
  }

  const handleItemDelete = () => {
    const newProducts = products.filter((item) => {
      return item.id.toString() !== product.id.toString()
    });
    setProducts(newProducts);
    navigate('/products');
  }

  const addProductImage = (files) => {
    // console.debug(files);
    const path = "/images/" + files[0].name;
    setImagePath(path)
    updater({
      imagePath: path
    });
  }

  const handleDeleteImage = (e) => {
    setImagePath("");
  }

  return (
    <article className="product-detailed">
      <div className="cells product-detailed__presentation">
          <div className="cell product-detailed__image-col">
            <div className="product-detailed__image">
              {
                imagePath &&
                <>
                  <img src={imagePath} alt={product.title}
                       width="500" height="500" loading="lazy"
                  />
                  <button
                    className="btn btn--icon btn--close"
                    title={getLocaleMsg("DELETE_IMAGE", lang)}
                    onClick={handleDeleteImage}
                  >
                    <span className="icon-x"></span>
                  </button>
                </>
              }
              {
                !imagePath &&
                <FileUpload
                  required={true}
                  onUpload={addProductImage}
                />
              }
            </div>
          </div>
          <div className="cell product-detailed__info-col">
            <FormField
              label={getLocaleMsg("TITLE", lang)}
              defaultValue={product.name}
              name="name"
              required
              blurHandler={handleUpdateProperty}
            />
            <ul className="unstyled product-detailed__props">
              <li>
                <FormField
                  label={getLocaleMsg("ARTICLE", lang)}
                  defaultValue={product.code}
                  name="code"
                  required
                  blurHandler={handleUpdateProperty}
                />
              </li>
              <li>
                <div className="cells cells--auto">
                  {Object.entries(product).map(([key, value], index) => {
                    const checks = [
                      {"isActive": "IS_ACTIVE"},
                      {"isSale": "ON_SALE"},
                      {"inStock": "IN_STOCK"},
                      {"isPurchased": "IS_PURCHASED"}
                    ];
                    if(getByPropFromObj(checks, key).length > 0) {
                      return (
                        <div className="cell" key={`product-detailed-check-${index}`}>
                          <label className="form__field">
                            <span className="checkbox">
                              <input
                                type="checkbox"
                                className="form__input"
                                checked={!!value}
                                onChange={handleUpdateBoolProperty}
                                name={key}
                              />
                              <span className="form__label">
                                {getLocaleMsg(getByPropFromObj(checks, key).toString(), lang)}
                              </span>
                            </span>
                          </label>
                        </div>
                      )
                    }
                  })}
                </div>
              </li>
              <li>
                <FormField
                  label={getLocaleMsg("BARCODE", lang)}
                  defaultValue={product.barcode}
                  name="barcode"
                  required
                  blurHandler={handleUpdateProperty}
                />
              </li>
              <li>
                <label className="form__field">
                  <span className="form__label required">
                    {getLocaleMsg("MANAGE_BY", lang)}
                  </span>
                  <Select
                    name="manageItemBy"
                    defaultValue={product.manageItemBy}
                    options={[
                      {
                        value: "1",
                        label: "None"
                      },
                      {
                        value: "2",
                        label: "Serial"
                      },
                      {
                        value: "3",
                        label: "Batch"
                      }
                    ]}
                    changeHandler={handleUpdateProperty}
                  />
                </label>
              </li>
              <li>
                <div className="product-detailed__qty">
                  <div className="form__label">
                    {getLocaleMsg("QTY", lang)}
                  </div>
                  <div className="cells cells--2">
                    <div className="cell">
                      <FormField
                        label={getLocaleMsg("MIN", lang)}
                        defaultValue={product.minimumInventory}
                        name="minimumInventory"
                        required
                        blurHandler={handleUpdateProperty}
                      />
                    </div>
                    <div className="cell">
                      <FormField
                        label={getLocaleMsg("MAX", lang)}
                        defaultValue={product.maximumInventory}
                        name="maximumInventory"
                        required
                        blurHandler={handleUpdateProperty}
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      <FormField
        label={getLocaleMsg("DESCRIPTION", lang)}
        defaultValue={product.descr}
        name="descr"
        blurHandler={handleUpdateProperty}
        className="product-detailed__descr"
      />
      <FormField
        label={getLocaleMsg("REMARKS", lang)}
        defaultValue={product.remarks}
        name="remarks"
        blurHandler={handleUpdateProperty}
        className="product-detailed__remarks"
      />
      <div className="form__field">
        <button className="btn" onClick={handleItemDelete}>
          {getLocaleMsg("DELETE_PRODUCT", lang)}
        </button>
      </div>
    </article>
  )
}

export default ProductDetailed;