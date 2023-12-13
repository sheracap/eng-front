import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  tableWr: {
    width: "100%",

    "& .ant-table": {
      background: "transparent",

      "& .ant-table-container": {
        "& table": {
          "& tr": {
            "& th:first-child, & td:first-child": {
              // borderRadius: "12px 0 0 12px",
            },
            "& th:last-child, & td:last-child": {
              // borderRadius: "0 12px 12px 0",
            },
          },
        },
      },
    },
    "& .ant-table-thead": {
      "& .ant-table-cell": {
        backgroundColor: "#EAECF5",
        fontWeight: 600,
        fontSize: 14,
        color: "#64748B",

        "&::before": {
          display: "none",
        },
      },
    },

    "& .ant-table-cell": {
      // borderBottom: `2px solid ${$colors.bodyColor}`,
      color: "#64748B",
      fontWeight: 400,
    },
    "& .ant-table-row": {
      backgroundColor: "#fff",

      "&:hover": {
        "& .ant-table-cell": {
          background: "#fbfbfb",
        },
      },
    },
  },
});
