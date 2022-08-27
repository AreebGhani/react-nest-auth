import React, { useEffect, useState } from "react";
import ThemeSelector from "./ThemeSelector";

var Theme = null;

if (localStorage.getItem("Theme")) {
  Theme = JSON.parse(localStorage.getItem("Theme"));
}

export default function ChangeThemeButton() {
  const [switchValue, setSwitchValue] = useState(
    Theme === "light" ? "off" : "on"
  );
  const [switchIcon, setSwitchIcon] = useState(
    Theme === "light" ? "bi bi-sun-fill" : "bi bi-moon-fill"
  );
  const switchControl = () => {
    if (switchValue === "on") {
      Theme = "light";
      setSwitchValue("off");
    } else {
      Theme = "dark";
      setSwitchValue("on");
    }
  };
  const switchIconControl = () => {
    if (switchValue === "on") {
      setSwitchIcon("bi bi-moon-fill");
    }
    if (switchValue === "off") {
      setSwitchIcon("bi bi-sun-fill");
    }
  };
  useEffect(() => {
    switchIconControl();
    localStorage.setItem("Theme", JSON.stringify(Theme));
  }, [switchValue, switchIcon, Theme]);
  return (
    <>
      <div className="form-check form-switch mt-2 text-color bg-color">
        {switchValue === "off" ? (
          <input
            className="form-check-input text-color bg-color"
            type="checkbox"
            role="switch"
            id="switch"
            onChange={switchControl}
          />
        ) : (
          <input
            className="form-check-input text-color bg-color"
            type="checkbox"
            role="switch"
            id="switch"
            checked
            onChange={switchControl}
          />
        )}
        <label
          className="form-check-label text-color bg-color"
          htmlFor="switch"
        >
          <i className={switchIcon}></i>
        </label>
      </div>
      <ThemeSelector theme={Theme} />
    </>
  );
}
