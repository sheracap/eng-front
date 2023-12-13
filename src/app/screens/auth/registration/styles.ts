import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  signIn: {
    flexGrow: 1,
    maxWidth: "416px",
    margin: "0 auto",
  },
  form: {
    padding: "20px 0 0",
  },
  infoCont: {
    display: "flex",
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
    "& span": {
      marginRight: 11,
      color: $colors.grey,
      fontSize: 14,
    },
  },
  rememberMe: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    "& .checkbox-0-2-8": {
      // margin: 0
    },
    "& .ant-form-item-control-input": {
      minHeight: "min-content",
    },
    "& span": {
      color: $colors.grey,
      fontSize: 14,
      cursor: "pointer",
      "&:hover": {
        color: "red",
      },
    },
    "& .ant-form-item": {
      margin: 0,
    },
  },
  checkbox: {
    padding: 0,
    minHeight: "min-content",
  },
  buttonCont: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginTop: 56,
  },
  error: {
    margin: "16px 0 0",
  },
});
