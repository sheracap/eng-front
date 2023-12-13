import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  headerAuth: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "24px 43px",
  },
  headerAuthLogo: {
    fontSize: 0,
    lineHeight: 0,

    "& a": {
      color: $colors.dark,
    },
  },
});
