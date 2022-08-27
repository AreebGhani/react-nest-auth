import React from "react";
import { lightMode } from "./light.mode";
import { darkMode } from "./dark.mode";

export default function ThemeSelector({ theme }) {
  return (
    <>
      <style jsx="true">{theme === "dark" ? darkMode : lightMode}</style>
    </>
  );
}
