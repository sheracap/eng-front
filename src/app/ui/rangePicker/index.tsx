import React, { FC } from "react";

import { RANGE_DATE_FORMAT, RANGE_DATE_TIME_FORMAT } from "#constants/index";
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";

type PropTypes = {
  onFilterChange: (p: { from: string | undefined; to: string | undefined }) => void;
  from: string | undefined;
  to: string | undefined;
  format?: string;
} & RangePickerProps;

export const RangePickerUI: FC<PropTypes> = (props) => {
  const { onFilterChange, from, to, format, ...restProps } = props;
  const currentFormat = format ? format : RANGE_DATE_TIME_FORMAT;

  const onDateRange = (values) => {
    if (!values) {
      onFilterChange({
        from: undefined,
        to: undefined,
      });
    } else {
      const from = moment(values[0]).startOf("day").format(currentFormat);
      const to = moment(values[1]).endOf("day").format(currentFormat);

      onFilterChange({
        from,
        to,
      });
    }
  };

  return (
    <DatePicker.RangePicker
      value={from && to ? [moment(from), moment(to)] : undefined}
      onChange={onDateRange}
      format={RANGE_DATE_FORMAT}
      {...restProps}
    />
  );
};
