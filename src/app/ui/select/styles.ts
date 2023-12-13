import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

// import Color from "color";

// const primaryColor = new Color($colors.primary);
// const secondaryColorActive = primaryColor.darken(0.2).toString();
//
// const blueColor = new Color($colors.blue);
// const blueColorHover = blueColor.darken(0.05).toString();
// const blueColorActive = blueColor.darken(0.1).toString();

export const useStyles = createUseStyles({
  select: {
    "& .ant-select-arrow": {
      // width: 15,
      // height: 15,
      // right: 14,
      // marginTop: "-7px",
      color: $colors.primary,
    },
  },
  readOnly: {
    "&.ant-select-multiple.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector": {
      background: $colors.readOnlyBg,
    },
    "&.ant-select-disabled.ant-select-multiple .ant-select-selection-item": {
      color: $colors.textColor,
      background: "#FDFDFD",
    },

    "&.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector": {
      background: $colors.readOnlyBg,
      color: $colors.textColor,
    },
  },
  auth: {
    // '&.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-selector': {
    //   borderColor: 'red !important'
    // }
  },
});
