import { useEffect } from "react";

const useCustomStyle = (style = {}) => {
  useEffect(() => {
    let { buttonBorderRadius = 0, custom = "" } = style;

    let styleTag = document.getElementById("customStyle");

    if (styleTag) styleTag.remove();

    styleTag = document.createElement("style");

    styleTag.id = "customStyle";

    let innerHTML = custom;

    if (buttonBorderRadius) {
      innerHTML += `
      button, .btn {
        border-radius: ${buttonBorderRadius}px
      }`;
    }

    styleTag.innerHTML = innerHTML;

    document.getElementsByTagName("head")[0].appendChild(styleTag);

    return () => {
      let el = document.getElementById("customStyle");
      if (el) el.remove();
    };
  }, [style]);
};

export default useCustomStyle;
