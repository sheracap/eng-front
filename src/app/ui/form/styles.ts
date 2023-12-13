import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  form: {
    color: "#f00",

    "& .ant-form-item-label": {
      "& >label.ant-form-item-required": {
        "&:not(.ant-form-item-required-mark-optional)": {
          "&:after": {
            content: '"*"',
            display: "inline-block",
            margin: "-5px 0 0 4px",
            color: $colors.primary,
            fontSize: "12px",
            fontFamily: "SimSun,sans-serif",
            lineHeight: 1,
          },
        },
      },
    },
  },
});
