import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".ui-checkbox": {
      alignItems: "center",

      "& .ant-checkbox": {
        "& + span": {
          paddingTop: "5px",
          fontSize: "14px",
          lineHeight: 1,
        },
      },
      "& .ant-checkbox-inner": {
        width: "20px",
        height: "20px",

        borderRadius: "6px",

        "&:after": {
          width: "5.714286px",
          height: "11.142857px",
          margin: "-1px 0 0",
        },
      },
    },
  },
});
