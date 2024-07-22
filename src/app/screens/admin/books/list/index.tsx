import React, { useEffect, useMemo, useState } from "react";
import { ButtonUI } from "#ui/button";
import { AddBookModal, AddBookModalType } from "./addBook";
import { ModalUI } from "#ui/modal";
import { useModalControl } from "#hooks/useModalControl";
import { ContentUI } from "#ui/content";
import { TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";

import { useStore } from "effector-react";
import { $booksList } from "#stores/books";
import { Link } from "react-router-dom";
import { ROUTES } from "#constants/index";

export const AdminBooks = () => {

  const booksListState = useStore($booksList.store);

  const [params, setParams] = useState<any>({ page: 1 });

  const addBookModalControl = useModalControl<AddBookModalType>();

  const getList = () => {
    $booksList.effect(params);
  };

  useEffect(() => {
    getList();
  }, [params]);
  
  const tableColumns = useMemo(() => {
    const columns: ColumnsType<any> = [
      {
        title: "Название",
        dataIndex: "title",
        render: (_, item) => <Link to={`/admin/${ROUTES.BOOKS}/${item.id}`}>{item.title}</Link>,
      },
    ];

    return columns;
  }, []);

  const onChangePagination = (page) => {
    setParams({
      ...params,
      page
    });
  }
  
  return (
    <ContentUI>
      <div className="main-content">
        <div>
          <div className="folder-head content-block">
            <h1>Книги</h1>
            <ButtonUI onClick={() => addBookModalControl.openModal()}>
              Добавить книгу
            </ButtonUI>
          </div>
        </div>
      </div>

      <TableUI
        loading={booksListState.loading}
        dataSource={booksListState.data.rows}
        columns={tableColumns}
        pagination={{
          total: booksListState.data.count,
          pageSize: 10,
          current: 1,
          hideOnSinglePage: true,
          onChange: onChangePagination,
        }}
      />

      <ModalUI
        open={addBookModalControl.modalProps.open}
        onCancel={addBookModalControl.closeModal}
        width={600}
      >
        <AddBookModal modalControl={addBookModalControl} callback={getList} />
      </ModalUI>
    </ContentUI>
  )
}