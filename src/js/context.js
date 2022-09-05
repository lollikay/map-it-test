import React, { createContext } from "react"

const DataContext = createContext({
  lang: "en",
  setLang: (lang) => {},
  products: [],
  setProducts: (products) => {}
})

export const DataProvider = DataContext.Provider
export const DataConsumer = DataContext.Consumer

export default DataContext