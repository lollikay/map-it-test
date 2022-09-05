import React, {Fragment, Children} from "react";

export const Resource = (props) => {
  const {resource, children} = props;
  const arrayChildren = Children.toArray(children);
  const data = resource.read();

  return (
    <Fragment>
      {Children.map(arrayChildren, (child) => {
        return React.cloneElement(child, {
          data
        });
      })}
    </Fragment>
  )
}