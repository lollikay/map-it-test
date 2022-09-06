import React from "react";
import {Link} from "react-router-dom";

const Welcome = (props) => {
  return (
    <>
      <h2>
        Welcome to this small React app!
      </h2>
      <p>
        This app doesn't store any data outside the app itself, so any changes you might do, will disappear
        as soon as you leave the page.
      </p>
      <p>
        Navigate to <Link to="/products">products list page</Link> to see the list of products and add a new product.
      </p>
      <p>
        Navigate to a product page to be able to "edit" any stored data, including image. One can also remove
        product from the list of products.
      </p>
      <p>
        The app's interface can be translated into another language (Russian) - that is done via built-in "vocabulary"
        - the language switch can be found in top right corner of a page.
      </p>
      <p>
        Thank you for the attention :)
      </p>
    </>
  )
}

export default Welcome;