import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useStore } from "effector-react";
import { $bookDetails } from "#stores/books";
import { ButtonUI } from "#ui/button";
import { ContentUI } from "#ui/content";
import { ArrowBackSvgIcon } from "#src/assets/svg";
import { useHistory } from "react-router";
import { useModalControl } from "#hooks/useModalControl";
import { AddBookPageModalType, AddBookPageModal } from "./addBookPage";
import { ModalUI } from "#ui/modal";
import { AddBookModal, AddBookModalType } from "#src/app/screens/admin/books/list/addBook";

export const AdminBookDetails = () => {
  const match = useRouteMatch<any>();
  const bookId = Number(match.params.id);

  const history = useHistory();

  const { data } = useStore($bookDetails.store);

  const addBookModalControl = useModalControl<AddBookModalType>();
  const addBookPageModalControl = useModalControl<AddBookPageModalType>();

  useEffect(() => {
    $bookDetails.effect(bookId);

    return () => {
      $bookDetails.reset();
    }
  }, []);

  if (!data) {
    return null;
  }


  return (
    <ContentUI>
      <div className="main-content">
        <div>
          <div className="folder-head content-block">
            <h1>
              <ButtonUI type="secondary" onClick={() => history.goBack()} withIcon>
                <ArrowBackSvgIcon />
              </ButtonUI>
              &nbsp;&nbsp;&nbsp;{data.title}
            </h1>
            <ButtonUI onClick={() => addBookModalControl.openModal({ bookDetails: data })}>
              Редактировать книгу
            </ButtonUI>
          </div>
        </div>
      </div>

      <div>
        <div>Уровень: {data.level}</div>
      </div>

      <div>
        <div>Язык: {data.language}</div>
      </div>

      <div>
        <h3>Описание:</h3>
        <div style={{ whiteSpace: "pre-wrap" }}>{data.description}</div>
      </div>

      <h2>Страницы</h2>


      {data.bookPages.map((item, index) => (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }} key={item.id}>
          <div>{index + 1}. {item.title} &nbsp;&nbsp;&nbsp;</div>
          <ButtonUI size="small" onClick={() => addBookPageModalControl.openModal({ bookId, bookPageId: item.id })}>
            Редактировать
          </ButtonUI>
        </div>
      ))}

      <div>
        <ButtonUI type="primary" size="small" onClick={() => addBookPageModalControl.openModal({ bookId })}>
          + Добавить страницу
        </ButtonUI>
      </div>

      <ModalUI
        open={addBookPageModalControl.modalProps.open}
        onCancel={addBookPageModalControl.closeModal}
        width={800}
      >
        <AddBookPageModal modalControl={addBookPageModalControl} callback={() => $bookDetails.effect(bookId)} />
      </ModalUI>

      <ModalUI
        open={addBookModalControl.modalProps.open}
        onCancel={addBookModalControl.closeModal}
        width={600}
      >
        <AddBookModal modalControl={addBookModalControl} callback={() => $bookDetails.effect(bookId)} />
      </ModalUI>

    </ContentUI>
  )
}