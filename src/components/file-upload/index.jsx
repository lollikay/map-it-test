import "./style.pcss";
import React, {useContext, useState} from "react";
import DataContext from "../../js/context";
import {getLocaleMsg} from "../../js/utils/getLocaleMsg";

const FileUpload = (props) => {
  const {multiple = false, required = false, onUpload = (files) => {}} = props
  const {lang} = useContext(DataContext);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileAttach = (e) => {
    const {target} = e;
    // console.debug(target.files);
    if(required) {
      if (target.files.length > 0) {
        setIsValid(true);
        onUpload(target.files);
      } else {
        setIsValid(false);
        setErrorMessage(getLocaleMsg("EMPTY"));
      }
    } else {
      setIsValid(true);
      onUpload(target.files);
    }
  }

  return (
    <label className={`file-upload form__field ${isValid ? "" : "is-invalid"}`}>
      <span className={`file-upload__label form__label ${required ? "required" : ""}`}>
        {getLocaleMsg("FILE_UPLOAD", lang)}
      </span>
      <input
        type="file"
        className="file-upload__input"
        required={required}
        onChange={handleFileAttach}
        multiple={multiple}
      />
      {!isValid &&
        <span className="form__message">
          {errorMessage}
        </span>
      }
    </label>
  )
}

export default FileUpload;