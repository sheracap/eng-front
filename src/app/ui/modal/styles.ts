import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".ant-modal-mask": {
      background: "rgba(13, 13, 13, 0.7)",
    },
    ".custom-modal-wrap": {
      maxHeight: "100%",
      padding: "20px 0 40px",
    },
    ".custom-modal": {
      top: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0",

      "& .ant-modal-content": {
        flexGrow: 1,
        maxHeight: "100%",
        maxWidth: "100%",
        padding: "24px 14px 24px",
        boxShadow: "0px 15px 30px rgb(0 0 0 / 16%)",

        display: "flex",
        flexDirection: "column",
      },

      "& .ant-modal-body": {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowX: "auto",
        padding: "0 10px 0 10px",
      },

      "& .ant-modal-close": {
        right: "10px",
        top: "10px",

        "& .ant-modal-close-x": {
          width: "40px",
          height: "40px",
          lineHeight: "47px",
          color: $colors.primary,
        },
      },

      // "& .ant-modal-header": {
      //   borderBottom: "none",
      //   padding: "0",
      //   margin: "-5px 0 30px",
      //   textAlign: "center",
      // },

      "&__header": {
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0 0 24px",

        "& .custom-modal__title": {
          marginBottom: 0,
        },

        "&__cancelBtnWr": {
          fontSize: 0,
          lineHeight: 0,

          "& .custom-btn": {
            fontSize: 0,
            lineHeight: 0,
            border: "none",
            width: "20px",
            height: "20px",
            padding: "0",
            background: "none",
          },
        },
      },
      "&__footer": {
        flexShrink: 0,
        margin: "40px 0 0",
        overflow: "hidden",
      },

      "&__title": {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: "normal",
        margin: "0 0 24px",
      },

      "&__middle": {
        flexGrow: 1,
        overflowY: "auto",
        padding: "0 10px 0 10px",
        margin: "0 -10px 0 -10px",
      },

      "&__buttons": {
        display: "flex",
        justifyContent: "center",
        margin: "0 -8px",

        "&__col": {
          width: "50%",
          padding: "0 8px",
        },

        "& .custom-btn": {
          width: "100%",
          paddingLeft: "34px",
          paddingRight: "34px",
        },

        "&-right": {
          justifyContent: "flex-end",
        },
      },

      "&__error": {
        margin: "0 0 20px",
      },

      "& .ant-form-item": {
        marginBottom: "14px",

        "& .ant-form-item": {
          margin: "0",
        },
      },

      "& .abs-loader": {
        borderRadius: $variables.borderRadius,
      },

      "& iframe": {
        border: "none",
      },
    },
  },
  successNote: {
    textAlign: "center",
  },
  successNoteIcon: {
    fontSize: 0,
    lineHeight: 0,
    margin: "0 0 24px",
  },
  successNoteTitle: {
    margin: "0 0 8px",
    fontSize: "20px",
    fontWeight: 600,
  },
  successNoteSubTitle: {
    fontSize: "14px",
    fontWeight: 500,
    // color: $colors.formGray
  },
  successNoteCloseBtn: {
    margin: "32px 0 0",
  },
});
