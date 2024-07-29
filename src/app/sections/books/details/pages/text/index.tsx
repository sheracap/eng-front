import React, { FC } from "react";
import { AddWordModal, AddWordModalPropsTypes } from "#src/app/sections/vocabulary/addWordModal";
import { ModalUI } from "#ui/modal";
import { useModalControl } from "#hooks/useModalControl";

type PropsTypes = {
  text: string;
}

export const BookDetailsText: FC<PropsTypes> = (props) => {
  const { text } = props;

  const addWordModalControl = useModalControl<AddWordModalPropsTypes>();

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    console.log("selectedText", selectedText);

    addWordModalControl.openModal({ word: selectedText });
  };

  return (
    <>
      <div className="book-details__pages__text" onMouseUp={handleTextSelect}>
        {text}
      </div>
      <ModalUI
        open={addWordModalControl.modalProps.open}
        onCancel={addWordModalControl.closeModal}
        width={800}
      >
        <AddWordModal modalControl={addWordModalControl} />
      </ModalUI>
    </>
  )
}