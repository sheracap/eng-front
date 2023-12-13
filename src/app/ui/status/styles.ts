import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

const getColorByStatus = (status: string) => {
  switch (status) {
    case "NEW":
    case "DRAFT":
      return $colors.info;
    case "IN_PROGRESS":
    case "PENDING":
    case "RETURNED":
      return $colors.orange;
    case "ACCEPTED":
    case "CLOSED":
    case "SHIPPED":
    case "CREATED":
    case "ACTIVE":
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
    display: "flex",
    alignItems: "center",
    position: "relative",
    border: "none",
    background: "none",
    color: (props) => {
      return props.color ? props.color : getColorByStatus(props.status);
    },
    fontSize: "14px",
    lineHeight: "22px",
    whiteSpace: "nowrap",

    "& span": {
      display: "block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      marginRight: "10px",
      background: (props) => {
        return props.color ? props.color : getColorByStatus(props.status);
      },
    },
  },
});
