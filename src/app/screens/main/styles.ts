import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  wrapper: {
    position: "relative",
    height: "100%",
    overflow: "hidden",

    "& .ant-layout-content": {
      height: "100%",
    },
  },
  wrapperIn: {
    height: "100%",
  },
  layout: {
    display: "flex",
  },
  leftSideWrap: {
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.1)",

    "& .ant-layout-sider-children": {
      display: "flex",
      flexDirection: "column",
    },
  },
  contentMain: {
    height: "100%",
    overflow: "auto",
    position: "relative",
  },
  spinner: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
});
