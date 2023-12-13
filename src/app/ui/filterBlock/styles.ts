import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".filter-block": {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      margin: "-5px 0 15px -15px",

      "&__item": {
        minWidth: "230px",
        maxWidth: "230px",
        margin: "5px 0 7px 15px",

        "& .ant-select": {
          width: "100%",
        },
      },

      "&__buttons": {
        margin: "0 0 0 20px",

        "& .custom-btn + .custom-btn": {
          margin: "0 0 0 10px",
        },
      },

      "&__actions": {
        display: "flex",
        margin: "5px 0 7px 5px",

        "&__item": {
          margin: "0 0 0 10px",

          "& .custom-btn svg": {
            width: "16px",
            height: "16px",
          },
        },
      },
    },
  },
  search: {
    flexGrow: 1,
    maxWidth: "350px",
  },
});
