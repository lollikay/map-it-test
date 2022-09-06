import React, {useContext, useState} from "react";
import {isValidInput} from "../js/utils/isValidInput";
import {getLocaleMsg} from "../js/utils/getLocaleMsg";
import DataContext from "../js/context";

const FormField = (props) => {
  const {className, label = "Label", defaultValue = "Text", name = "input", required = false, blurHandler = (target) => {}, ...extra} = props;
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {lang} = useContext(DataContext);

  const handleInputBlur = (e) => {
    const {target} = e;
    if(isValidInput(target)) {
      setIsValid(true);
      blurHandler(target);
    } else {
      setIsValid(false);
      setErrorMessage(getLocaleMsg("EMPTY", lang))
    }
  }

  return (
    <label
      className={`form__field ${isValid ? "" : "is-invalid"} ${className}`}
    >
      <span className={`form__label ${required ? "required" : ''}`}>
        {label}
      </span>
      <input
        type="text"
        className="form__input"
        defaultValue={defaultValue}
        name={name}
        required={required}
        onBlur={handleInputBlur}
        {...extra}
      />
      {!isValid &&
        <span className="form__message">
          {errorMessage}
        </span>
      }
    </label>
  )
}

export default FormField;