import React from "react";
import "./style.pcss";

export const ReactLoader = (props) => {
  const {className}  = props;

  return (
    <div className={"react-loader " + className}></div>
  )
}
