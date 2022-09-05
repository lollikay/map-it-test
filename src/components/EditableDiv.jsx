import React from "react";

const EditableDiv = (props) => {
  const {value, updater, className, name} = props;

  const handleUpdateValue = (e) => {
    updater(e);
  }

  return (
    <div
      contentEditable={true}
      suppressContentEditableWarning={true}
      name={name}
      onInput={handleUpdateValue}
      className={`${className ? className : ''} ${value.length < 1 ? "is-empty" : ""}`}
      data-js-editable-div
    >
      {value}
    </div>
  )
}

export default EditableDiv;