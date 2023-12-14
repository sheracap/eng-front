import React, { useEffect, useState } from "react";
import { RichTextEditor } from "../index";


export const RichTextEditorWrapper = (props) => {
  const { value, initialValue, ...restProps } = props;

  const [initialValueLocal, setInitialValueLocal] = useState(initialValue);

  useEffect(() => {
    setInitialValueLocal(null);
  }, [initialValue]);

  useEffect(() => {
    if (!initialValueLocal) {
      setInitialValueLocal(initialValue);
    }
  }, [initialValueLocal]);

  if (initialValue && !initialValueLocal) {
    return null;
  }

  return (
    <RichTextEditor value={value} initialValue={initialValueLocal} {...restProps} />
  );
};
