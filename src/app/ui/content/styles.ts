import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".custom-content": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "auto",
      padding: "20px 10px 0 20px",
    },

    ".custom-content-fixed": {},

    ".custom-content__loading": {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      top: "2rem",
      left: "0",
      right: "0",
      bottom: "0",
      background: "rgba(255, 255, 255, .5)",
      zIndex: 99999,
    },

    ".custom-content__header": {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: "20px",

      "&__title": {
        display: "flex",
        fontWeight: 600,
        alignItems: "center",
        textAlign: "center",
        fontSize: "18px",

        ".custom-content__header__item": {
          display: "flex",
          alignItems: "center",
          marginRight: "16px",

          "& a": {
            color: $colors.textColor,

            "&:hover": {
              textDecoration: "underline",
            },
          },
        },
      },

      "&__separator": {
        margin: "0 16px 0 0",
      },

      "&__total": {
        fontSize: "18px",
        marginLeft: 5,
        fontWeight: "normal",

        "& strong": {
          fontSize: "18px",
          fontWeight: "600",
        },
      },

      "&__back-btn": {
        fontSize: 0,
        lineHeight: 0,
      },

      "&__actions": {
        display: "flex",
        alignItems: "center",

        "& > * + *": {
          marginLeft: "15px",
        },
      },
    },

    ".custom-content__middle": {
      margin: "0 -10px 0 -10px",
      padding: "0 10px 0 10px",
      flexGrow: 1,
      overflowY: "auto",

      "&-content": {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflowX: "auto",
        padding: "24px 16px 24px 24px",

        "&__inner": {
          overflowY: "auto",
          padding: "0 8px 0 0",
        },
      },
    },
  },
});
