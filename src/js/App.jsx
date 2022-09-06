import React, {useState, useEffect} from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {LangSwitch} from "../components/LangSwitch";
import {DataProvider} from "./context";
import {getLocaleMsg} from "./utils/getLocaleMsg";
import {productsUrl} from "./cfg";
import {makeRequest} from "./utils/makeRequest";

const getProducts = async () => {
  const result = await makeRequest({
    url: productsUrl
  });
  return result;
}

export default function App() {
  const savedLang = localStorage.getItem("lang") || "en";
  const [lang, setLang] = useState(savedLang);
  const [products, setProducts] = useState([]);
  // console.debug(products)

  useEffect(() => {
    getProducts().then((result) => setProducts(result.products))
  }, [])

  return (
    // <Suspense fallback={<ReactLoader/>}>
      <DataProvider value={{
        lang,
        setLang,
        products,
        setProducts
      }}>
        <div>
          <header className="page-header">
            <div className="cells">
              <div className="cell">
                <h1>
                  React app for Map IT assessment
                </h1>
              </div>
              <div className="cell page-header__lang">
                <LangSwitch />
              </div>
            </div>
            <nav className="primary-nav nav">
              <ul className="primary-nav__list">
                <li className="primary-nav__item">
                  <NavLink
                    className={`primary-nav__link`}
                    to="/"
                  >
                    {getLocaleMsg("HOME", lang)}
                  </NavLink>
                </li>
                <li className="primary-nav__item">
                  <NavLink
                    className={`primary-nav__link`}
                    to="/products"
                  >
                    {getLocaleMsg("CATALOG", lang)}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </header>

          <Outlet />
        </div>
      </DataProvider>
  );
}