import "../styles/index.js";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Products from '../routes/products';
import {NoSuchPage} from "../routes/404";
import Product from '../routes/product';
import Welcome from "../components/welcome"

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Welcome />} />
          <Route path="products" element={<Products />}></Route>
          <Route path="products/:id" element={<Product />} />
          <Route path="*" element={<NoSuchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
);
