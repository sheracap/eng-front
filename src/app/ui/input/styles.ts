import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  input: {
    // padding: "12px 16px",
    "&.ant-input-affix-wrapper": {
      // borderColor: $colors.inputBg,

      "& .ant-input": {
        borderRadius: 0,
        // background: "none",
        // borderColor: "transparent",
      },
    },
    color: $colors.textColor,
  },
  auth: {
    "&:-internal-autofill-selected": {
      backgroundColor: [["red"], "!important"],
    },
    "&.ant-input-affix-wrapper": {
      // backgroundColor: 'rgba(232, 240, 254)'
    },
    border: "1px solid #D0D5DD",
    color: $colors.textColor,
    "&:focus": {
      color: $colors.textColor,
      borderColor: "#D0D5DD",
      outline: "none",
    },
    "&:hover": {
      color: $colors.textColor,
      borderColor: "#D0D5DD",
      outline: "none",
    },

    "&:active": {
      color: $colors.textColor,
      borderColor: "#D0D5DD",
      outlineColor: "#D0D5DD",
      outline: "none",
    },
  },
  readOnly: {
    "&.ant-input-disabled": {
      // background: $colors.readOnlyBg,
      // color: $colors.textColor,
    },
  },

  search: {
    position: "relative",
    minWidth: "300px",

    "& .ant-input-prefix": {
      marginRight: "12px",
    },

    "& .ant-input-clear-icon": {
      margin: "0",

      "&:not(.ant-input-clear-icon-hidden)": {
        "& + $searchIcon": {
          display: "none",
        },
      },
    },
  },
  searchIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    color: $colors.grey,
    fontSize: 0,
    lineHeight: 0,
  },
  inputNumber: {
    position: "relative",

    "& .ant-input-number": {
      width: "100%",
    },

    "& .ant-input-number-handler-wrap": {
      display: "none",
    },
  },
  inputNumber__suffix: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: "10px",
    top: "0",
    bottom: "0",
    lineHeight: "1",
  },
  inputNumberDisabled: {
    // color: $disableColor,
  },
  "split-input": {
    width: 52,
    height: 52,
    margin: "0 5px",
    padding: 19,
  },
  splitCont: {
    display: "flex",
  },
});
