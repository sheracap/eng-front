import { $colors } from "#styles/variables";
import Color from "color";
import { createUseStyles } from "react-jss";

const secondaryColor = new Color($colors.secondary);
const secondaryColorHover = secondaryColor.darken(0.05).toString();
const secondaryColorActive = secondaryColor.darken(0.1).toString();

const primaryLightColor = new Color($colors.primary);
const primaryLightColorHover = primaryLightColor.darken(0.1).toString();
const primaryLightColorActive = primaryLightColor.darken(0.15).toString();

const numpadColor = new Color("#EFF4FF");
const numpadColorHover = numpadColor.darken(0.02).toString();
const numpadColorActive = numpadColor.lighten(0.01).toString();

export const useStyles = createUseStyles({
  btn: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none",
    fontSize: "16px",
    lineHeight: 1.1,

    "&.ant-btn-primary": {
      "&:not(.ant-btn-dangerous):hover": {
        borderColor: primaryLightColorHover,
        background: primaryLightColorHover,
      },
    },

    "&.ant-btn-dangerous": {
      color: "#fff",
      backgroundColor: $colors.danger,

      "&:hover": {
        color: "#fff",
        backgroundColor: "#db111c"
      },
    },

    "&.ant-btn-sm": {
      fontSize: "14px",
      lineHeight: 1,
      padding: "8px 14px",
      height: "auto"
    },
    "&.ant-btn-icon-only": {
      padding: "5px",

      "&.ant-btn-sm": {
        padding: "3px 0",
      },
      "&.ant-btn-default:not(.ant-btn-dangerous)": {
        color: "#8F92A8",

        "&:hover": {
          color: $colors.primary,
        },
      },
    },
  },

  bordered: {
    background: "#fff",
    border: `2px solid ${$colors.primary}`,
    color: "#099250",
    lineHeight: 1,

    "&.ant-btn-dangerous": {
      borderColor: $colors.danger,
      color: $colors.danger,
    },
    "&:focus": {
      background: "#fff",
      color: "#099250",
      borderColor: $colors.primary,
    },
    "&:hover": {
      background: secondaryColorHover,
      color: "#099250",
    },

    "&:active": {
      background: "#fff",
      color: "#099250",
      borderColor: $colors.primary,
    },
  },
  secondary: {
    background: secondaryColor.toString(),
    border: "none",
    boxShadow: "none",
    color: "#3E4784",

    "&:focus": {
      background: secondaryColor.toString(),
      color: "#3E4784",
    },

    "&:hover": {
      background: secondaryColorHover,
      color: "#3E4784",
    },

    "&:active": {
      background: secondaryColorActive,
    },
  },
  "light-blue": {
    background: numpadColor.toString(),
    border: "none",
    boxShadow: "none",
    color: $colors.textColor,

    "&:focus": {
      background: numpadColorHover,
      color: $colors.textColor,
    },

    "&:hover": {
      background: numpadColorHover,
      color: $colors.textColor,
    },

    "&:active": {
      background: numpadColorActive,
    },
  },
  noBorder: {
    border: "none",
  },
  btnWithIcon: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",

    "& span + svg": {
      margin: "0 0 0 12px",
    },

    "& svg + span": {
      margin: "0 0 0 12px",
    },
  },
  fullWidth: {
    width: "100%",
  },

  "@global": {
    "a.ant-btn": {
      paddingTop: "0 !important",
      paddingBottom: "0 !important",
    },
  },
});
