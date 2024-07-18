import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  title: {
    position: "relative",
    alignSelf: "center",
    textAlign: "center",
    margin: "0 0 20px",
  },
  primary: {
    fontSize: "36px",
    lineHeight: "40px",
    fontWeight: 700,
  },
  secondary: {
    fontSize: 24,
    fontWeight: 600,
  },
  backBtnWr: {
    position: "absolute",
    left: 0,
    top: "50%",
    margin: "-12px 0 0",
    fontSize: 0,
  },
});
