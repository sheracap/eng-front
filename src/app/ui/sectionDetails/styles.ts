import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  details: {
    display: "flex",
    flexWrap: "wrap",
  },
  item: {
    margin: "0 20px 20px 0",
    minWidth: "240px",
    maxWidth: "240px",
  },
  title: {
    margin: "0 0 4px",
  },
  body: {},
});
