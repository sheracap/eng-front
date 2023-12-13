import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    body: {

      "& .ant-form-vertical": {
        "& .ant-form-item-label": {
          padding: "0 0 3px",
        },
      },
    },
    ".content-inner": {
      padding: "20px",
    },

    ".abs-loader": {
      position: "absolute",
      zIndex: 1,
      left: "0",
      top: "0",
      right: "0",
      bottom: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
      background: "rgba(255, 255, 255, .5)",

      "&.bodyBg": {
        background: "rgba(249, 250, 251, .5)",
      },
    },

    ".primaryColor": {
      color: $colors.primary,
    },
  },
});
