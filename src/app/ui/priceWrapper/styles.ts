import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  price: {
    position: "relative",
    minWidth: "400px",

    "& strong": {
      color: $colors.textColor,
    },

    "& span": {
      color: "#8F92A8",
    },
  },
});
