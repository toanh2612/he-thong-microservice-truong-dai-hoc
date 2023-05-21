import { blue, purple, green, yellow, red, cyan, pink, gray } from "./colors";

export const Theme = {
  colors: {
    // background colors
    background: "white",
    backgroundAlpha: "rgba(255, 255, 255, 0.8)",
    foreground: "black",
    backgroundContrast: "white",
    rapidBackgroundItem: "rgb(255, 255, 255)",
    backGroundTabRapid: gray.gray50,
    backgroundSelectedTab: "white",
    backgroundModal: "white",
    backgroundReopen: gray.gray50,
    // semantic colors
    ...blue,
    ...purple,
    ...green,
    ...yellow,
    ...red,
    ...cyan,
    ...pink,
    ...gray,

    // misc
    textLight: "rgba(236, 237, 238, 0.2)",
    text: gray.gray900,
    linkLight: "rgba(0, 114, 245, 0.2)",
    link: blue.blue600,
    codeLight: pink.pink100,
    code: pink.pink600,
    selection: blue.blue200,
    border: "rgba(0, 0, 0, 0.15)",

    primary: blue.blue600,
    success: green.green600,
    secondary: purple.purple700,
    warning: yellow.yellow600,
    error: red.red600,
    gradient: `linear-gradient(112deg, ${cyan.cyan600} -63.59%, ${pink.pink600} -20.3%, ${blue.blue600} 70.46%)`,

    primaryLight: blue.blue200,
    secondaryLight: purple.purple200,
    successLight: green.green200,
    warningLight: yellow.yellow200,
    errorLight: red.red200,

    primaryLightHover: blue.blue400,
    secondaryLightHover: purple.purple400,
    successLightHover: green.green400,
    warningLightHover: yellow.yellow400,
    errorLightHover: red.red400,
  },
  shadows: {
    xs: "0 2px 8px 1px rgb(104 112 118 / 0.07), 0 1px 1px -1px rgb(104 112 118 / 0.04)",
    sm: "0 2px 8px 2px rgb(104 112 118 / 0.07), 0 2px 4px -1px rgb(104 112 118 / 0.04)",
    md: "0 12px 20px 6px rgb(104 112 118 / 0.08)",
    lg: "0 12px 34px 6px rgb(104 112 118 / 0.18)",
    xl: "0 25px 65px 0px rgb(104 112 118 / 0.35)",
  },
  dropShadows: {
    xs: "drop-shadow(0 2px 4px rgb(104 112 118 / 0.07)) drop-shadow(0 1px 1px rgb(104 112 118 / 0.04))",
    sm: "drop-shadow(0 2px 8px rgb(104 112 118 / 0.07)) drop-shadow(0 2px 4px rgb(104 112 118 / 0.04))",
    md: "drop-shadow(0 4px 12px rgb(104 112 118 / 0.08)) drop-shadow(0 20px 8px rgb(104 112 118 / 0.04))",
    lg: "drop-shadow(0 12px 24px rgb(104 112 118 / 0.15)) drop-shadow(0 12px 14px rgb(104 112 118 / 0.1))",
    xl: "drop-shadow(0 25px 34px rgb(104 112 118 / 0.35))",
  },
};
