import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  userBlockWr: {
    display: "flex",
    alignItems: "center",
    minWidth: "200px",
    height: "100%",
    margin: "0 0 0 10px",
  },
  userRow: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    cursor: "pointer",
    transition: "all 150ms ease-in-out",
    borderRadius: $variables.borderRadius,

    "&:hover": {
      background: "rgba(255, 255, 255, .15)",
    },

    "&.ant-popover-open": {
      background: "rgba(255, 255, 255, .15)",
    },
  },
  userPhoto: {
    width: "40px",
    height: "40px",
    marginRight: 8,
  },
  userPhotoPlaceholder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    color: $colors.mediumBlue,
    border: `1px solid ${$colors.mediumBlue}`,
    borderRadius: "50%",

    "& svg": {
      width: "20px",
    },
  },
  userDetails: {
    flexGrow: 1,
  },

  userPhotoImg: {
    objectFit: "cover",
    width: 40,
    height: 40,
    borderRadius: "100%",
  },

  userName: {
    fontSize: 14,
    fontWeight: 600,
    color: $colors.textColor,
    lineHeight: 1,
  },

  popoverWrap: {
    "& .ant-popover-inner-content": {
      padding: "8px 0",
    },

    "& ..ant-popover-inner": {
      boxShadow: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
    },
  },

  dropdown: {
    minWidth: 240,
  },
  dropdownItem: {
    color: "#101828",
    fontSize: 16,
    lineHeight: 1.2,
    width: "100%",
    padding: "10px 14px",
    cursor: "pointer",
    transition: "all 150ms ease-in-out",

    "&:hover": {
      background: "rgba(22, 179, 100, .1)",
    },
  },
});
