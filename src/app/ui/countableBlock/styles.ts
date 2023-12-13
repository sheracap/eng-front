import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  countableWrapper: {
    display: "flex",
    alignItems: "center",

    "& .ant-spin-spinning": {
      display: "flex",
      height: "15px",
    },
    "& > span": {
      marginRight: "5px",
    },
    countableItem: {
      margin: "0 15px 15px 0",
    },
  },
  countableItem: {
    margin: "0 15px 15px 0",
    "& > span": {
      marginRight: "5px",
    },
  },
});
