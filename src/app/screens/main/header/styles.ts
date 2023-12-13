import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  header: {
    position: "relative",
    zIndex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 15px",
    height: "56px",
    lineHeight: "normal",
    background: "#fff",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.1)",
  },
  headerLeftSide: {
    display: "flex",
    alignItems: "center",

    "& .ant-btn": {
      color: $colors.primary,
    },
  },
  headerRightSide: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  burgerButton: {
    background: "transparent",
    border: "none",
    width: "42px",
    height: "40px",
    padding: 0,

    "&:focus": {
      background: "transparent",
    },
    "&:hover": {
      background: "rgba(255, 255, 255, .15)",
    },
    "&:active": {
      background: "rgba(255, 255, 255, .15)",
    },
  },
  logo: {
    marginLeft: 15,
    fontSize: 0,
    lineHeight: 0,

    "& a": {
      color: "#fff",
    },
  },
});
