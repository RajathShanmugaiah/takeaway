import { useEffect } from "react";

const useFontFamily = (fonts = "Roboto") => {
  if (typeof fonts === "string") {
    fonts = [{ selector: "*", font: fonts }];
  }

  useEffect(() => {
    let styleTag = document.getElementById("fontStyle");

    if (styleTag) styleTag.remove();

    styleTag = document.createElement("style");

    styleTag.id = "fontStyle";

    let innerHTML = "";

    fonts.forEach(({ selector = "*", font = "Roboto" }) => {
      innerHTML += `
      @import url('https://fonts.googleapis.com/css2?family=${font}&display=swap');
      `;
    });

    fonts.forEach(({ selector = "*", font = "Roboto" }) => {
      innerHTML += `
        ${selector} {
          font-family: '${font}', sans-serif;
        }
      `;
    });

    styleTag.innerHTML = innerHTML;

    document.getElementsByTagName("head")[0].appendChild(styleTag);

    return () => {
      let el = document.getElementById("fontStyle");
      if (el) el.remove();
    };
  }, [fonts]);
};

export default useFontFamily;
