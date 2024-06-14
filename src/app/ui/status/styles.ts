import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

const getColorByStatus = (status: string) => {
  switch (status) {
    case "NEW":
      return $colors.info;
    case "assigned":
      return $colors.orange;
    case "completed":
      return $colors.success;
    case "CANCELLED":
    case "BLOCKED":
    case "REJECTED":
    case "IN_ACTIVE":
      return $colors.danger;
    default:
      return $colors.info;
  }
};

type statusPropTypes = {
  status: string;
  color?: string;
};

export const useStyles = createUseStyles<any, statusPropTypes>({
  status: {
    padding: "3px 10px",
    margin: "0",
    border: "none",
    borderRadius: "10px",
    backgroundColor: (props) => {
      return props.color ? props.color : getColorByStatus(props.status);
    },
    color: "#fff",
    fontSize: "14px",
    lineHeight: "22px",
    whiteSpace: "nowrap",
  },
});
