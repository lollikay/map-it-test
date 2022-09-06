import React from "react";

const Select = (props) => {
  const {className, defaultValue, options, changeHandler, name="select", ...extra} = props;

  return (
    <span className="slct">
      <select className={`form__input ${className}`}
        onChange={(e) => changeHandler(e.target)}
        defaultValue={defaultValue}
        name={name}
        {...extra}
      >
        {
          options.map((option, index) => {
            return (
              <option value={option.value} key={`${name}-option-${index}`}>
                {option.label}
              </option>
            )
          })
        }
      </select>
    </span>
  )
}

export default Select;