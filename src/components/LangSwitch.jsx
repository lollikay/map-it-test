import React, {useContext, useState} from "react";
import DataContext from "../js/context";

export const LangSwitch = (props) => {
  const {  } = props;
  const {lang, setLang} = useContext(DataContext);
  const langs = [
    {
      name: "English",
      value: "en"
    },
    {
      name: "Russian",
      value: "ru"
    }
  ]

  const handleLangChange = (e) => {
    const {target} = e;
    if(target.value) {
      localStorage.setItem("lang", target.value);
      setLang(target.value);
    }
  }

  return (
    <div className="slct">
      <select
        value={lang}
        onChange={handleLangChange}
      >
        {langs.map((langItem, i) => {
          return (
            <option value={langItem.value} key={"lang-switch-" + i}>
              {langItem.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}