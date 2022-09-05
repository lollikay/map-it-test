import "./style.pcss";

import React, {useContext} from "react";
import {getByPropFromObj} from "../../js/utils/getByPropFromObj";
import DataContext from "../../js/context";
import {getLocaleMsg} from "../../js/utils/getLocaleMsg";
import EditableDiv from "../EditableDiv";
import Select from "../Select";

const ProductDetailed = (props) => {
  const {product, updater} = props;
  const {lang} = useContext(DataContext);

  const els = {
    div: "data-js-editable-div",
    input: "data-js-editable-input"
  }

  const handleUpdateProperty = (e) => {
    const {target} = e;
    // console.debug(target)
    const propName = target.getAttribute("name");
    if(propName) {
      if (target.hasAttribute(els.div)) {
        // console.debug(target.innerHTML);
        updater({
          [propName]: target.innerHTML
        });
      } else if (target.hasAttribute(els.input)) {
        // console.debug(target.value);
        updater({
          [propName]: target.value
        });
      } else {
        console.debug("Unclear how to update property connected to element")
        console.debug(target)
      }
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

  return (
    <article className="product-detailed">
      <div className="cells product-detailed__presentation">
        <div className="cell product-detailed__image-col">
          <div className="product-detailed__image">
            <img src={product.imagePath} alt={product.title}
                 width="500" height="500" loading="lazy"
            />
          </div>
        </div>
        <div className="cell product-detailed__info-col">
          <h2 className="product-detailed__title required">
            <EditableDiv
              value={product.name}
              updater={handleUpdateProperty}
              name="name"
            />
          </h2>
          <ul className="unstyled product-detailed__props">
            <li>
              <div className="form__field">
                <div className="form__label required">
                  {getLocaleMsg("ARTICLE", lang)}
                </div>
                <EditableDiv
                  value={product.code}
                  updater={handleUpdateProperty}
                  name="code"
                />
              </div>
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
              <div className="form__field">
                <div className="form__label required">
                  {getLocaleMsg("BARCODE", lang)}
                </div>
                <EditableDiv
                  value={product.barcode}
                  updater={handleUpdateProperty}
                  name="barcode"
                />
              </div>
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
                  data-js-editable-input
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
                    <label className="form__field">
                      <span className="form__label required">
                        {getLocaleMsg("MIN", lang)}
                      </span>
                      <input type="text" className="form__input"
                             onChange={handleUpdateProperty}
                             defaultValue={product.minimumInventory}
                             data-js-editable-input
                             name="minimumInventory"
                      />
                    </label>
                  </div>
                  <div className="cell">
                    <label className="form__field">
                      <span className="form__label required">
                        {getLocaleMsg("MAX", lang)}
                      </span>
                      <input type="text" className="form__input"
                             onChange={handleUpdateProperty}
                             defaultValue={product.maximumInventory}
                             data-js-editable-input
                             name="maximumInventory"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="product-detailed__descr form__field">
        <div className="form__label">
          {getLocaleMsg("DESCRIPTION", lang)}
        </div>
        <EditableDiv
          value={product.descr}
          updater={handleUpdateProperty}
          name="descr"
        />
      </div>
      <div className="product-detailed__remarks form__field">
        <div className="form__label">
          {getLocaleMsg("REMARKS", lang)}
        </div>
        <EditableDiv
          value={product.remarks}
          updater={handleUpdateProperty}
          name="remarks"
        />
      </div>
    </article>
  )
}

export default ProductDetailed;