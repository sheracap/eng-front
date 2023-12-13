import React, { useEffect, useState } from "react";

import { CreateStoreReturnType } from "#core/effector/types/store";
import { SelectLookupUIPropTypes, SelectUIPropTypes } from "#types/components";
import { debounce } from "#utils/debounceLodash";
import { isFilledDependencies, isObjectType } from "#utils/index";
import { Select } from "antd";
import { useStore } from "effector-react";

import { useStyles } from "./styles";

export const withDebounce = debounce(
  (action: any) => {
    action();
  },
  150,
  false,
);

const SelectUI = (props: SelectUIPropTypes) => {
  const { className, readOnly, variant, ...restProps } = props;
  const classes = useStyles();

  let classesCompose = classes.select;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  if (variant) {
    classesCompose = `${classesCompose} ${classes[variant]}`;
  }

  if (readOnly) {
    classesCompose = `${classesCompose} ${classes.readOnly}`;
  }

  return <Select className={classesCompose} disabled={readOnly ? true : false} {...restProps} />;
};

const getOptions = (items, defaultOption, optionValue) => {
  const newArr: Array<any> = [];
  let isExist = false;

  items.forEach((item) => {
    newArr.push(item);

    if (String(item[optionValue]) === String(defaultOption[optionValue])) {
      isExist = true;
    }
  });

  if (!isExist) {
    newArr.push(defaultOption);
  }

  return newArr;
};

interface SelectLookupPropTypes extends SelectLookupUIPropTypes {
  itemsEffector: CreateStoreReturnType<any, any, any>;
}

const SelectLookup = (props: SelectLookupPropTypes) => {
  const {
    defaultOption,
    onChange,
    itemsEffector,
    disabledOptionsIds = {},
    optionValue = "id",
    optionName = "name",
    optionDetails,
    dependencies = [],
    requestParams = {},
    value,
    ...restProps
  } = props;

  const params = requestParams ? requestParams : null;

  const [isSearched, setIsSearched] = useState(false);

  const itemsState = useStore(itemsEffector.store);

  useEffect(() => {
    if (!dependencies.length) {
      itemsEffector.effect(params);
    }
  }, []);

  useEffect(() => {
    if (dependencies.length) {
      const filled = isFilledDependencies(dependencies);

      if (filled) {
        itemsEffector.effect(params);
      } else if (itemsState.data.length) {
        itemsEffector.reset();
      }
    }
  }, dependencies);

  const onSearch = (search) => {
    withDebounce(() => {
      setIsSearched(!!search);

      itemsEffector.effect({ search, ...params });
    });
  };

  const onValueChange = (val, option) => {
    if (isSearched) {
      setIsSearched(false);
    }
    itemsEffector.effect(params);
    onChange && onChange(val, option);
  };

  return (
    <SelectUI
      loading={itemsState.loading}
      onSearch={onSearch}
      onChange={onValueChange}
      disabled={!isFilledDependencies(dependencies)}
      value={isObjectType(value) ? String(value[optionValue]) : value ? String(value) : undefined}
      {...restProps}
    >
      {(!defaultOption || isSearched ? itemsState.data : getOptions(itemsState.data, defaultOption, optionValue)).map(
        (item) => (
          <Select.Option
            value={String(item[optionValue])}
            key={String(item[optionValue])}
            data-option={optionDetails ? item : null}
            disabled={itemsState.loading || !!disabledOptionsIds[item[optionValue]]}
          >
            {item[optionName]}
          </Select.Option>
        ),
      )}
    </SelectUI>
  );
};

SelectUI.Option = Select.Option;
SelectUI.Lookup = SelectLookup;

export { SelectUI };
