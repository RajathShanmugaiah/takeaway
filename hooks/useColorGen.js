import { useEffect } from 'react';
import chroma from 'chroma-js';

const toComplementaryColor = primaryColor => {
  let [h, s, l] = chroma(primaryColor).hsl();

  return chroma.hsl(h + (180 % 360), s, l);
};

const useColorGen = ({
  primaryColor = [0, 0, 0],
  darkMode = false,
  secondaryColor = null,
  backgroundColor = null,
  headerColor = null,
  fontColor = null
}) => {
  let dark = chroma(primaryColor).darken(5).desaturate(0.75).hex();
  let bright = '#ffffff';

  let colorPalette = chroma
    .scale(darkMode ? [bright, dark] : [dark, bright])
    .colors(10);

  let onPrimary = chroma(primaryColor).luminance() > 0.5 ? '#000' : '#fff';

  if (!backgroundColor) {
    backgroundColor = darkMode ? dark : bright;
  }

  if (!fontColor) {
    fontColor = darkMode ? bright : dark;
  }

  let hinted = colorPalette[2];

  let complementaryColor = toComplementaryColor(primaryColor);

  if (!secondaryColor) {
    secondaryColor = complementaryColor;
  }

  let onSecondary = chroma(secondaryColor).luminance() > 0.5 ? '#000' : '#fff';

  if (!headerColor) {
    headerColor = backgroundColor;
  }

  let linkColor =
    chroma.contrast(primaryColor, backgroundColor) > 4.5
      ? primaryColor
      : chroma(primaryColor).darken(1).saturate(1);

  useEffect(() => {
    let styleTag = document.getElementById('colorVars');

    if (styleTag) styleTag.remove();

    styleTag = document.createElement('style');

    styleTag.id = 'colorVars';

    styleTag.innerHTML = `
      body {
        --primary-color: ${primaryColor};
        --secondary-color: ${secondaryColor};
        --font-color: ${fontColor};
        --on-primary: ${onPrimary};
        --on-secondary: ${onSecondary};
        --hinted-font-color: ${hinted};
        --link-color: ${linkColor};
        --header-font: ${colorPalette[1]};
        --shadow-color: ${colorPalette[2]};
        --overlay-color: ${chroma(backgroundColor).alpha(0.3)};
        background: ${backgroundColor};
        color: ${fontColor};
      }
      .header, .header nav {
        background: ${headerColor};
      }
    `;

    document.getElementsByTagName('head')[0].appendChild(styleTag);

    if (darkMode) {
      document.getElementsByTagName('body')[0].classList.add('darkMode');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('darkMode');
    }

    return () => {
      let el = document.getElementById('colorVars');
      if (el) el.remove();
    };
  }, [primaryColor, darkMode]);

  return {
    colorPalette,
    primaryColor,
    onPrimary,
    complementaryColor,
    secondaryColor,
    onSecondary,
    fontColor,
    backgroundColor
  };
};

export default useColorGen;
