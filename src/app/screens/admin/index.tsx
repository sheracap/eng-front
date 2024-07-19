import React, { useEffect } from "react";
import { $currentUser } from "#stores/account";
import { useStore } from "effector-react";
import { Spinner } from "#ui/spinner";

export const AdminPage = () => {

  const currentUserState = useStore($currentUser.store);

  const { data: currentUser } = currentUserState;

  useEffect(() => {
    $currentUser.effect();

    return () => {
      $currentUser.reset();
    };
  }, []);

  if (!currentUser) {
    return (
      <div className="site-wrapper__spinner">
        <Spinner />
      </div>
    );
  }

  if (currentUser.id !== 1) {
    return (
      <div>
        No permission !
      </div>
    )
  }

  return (
    <div>
      Создать курсы
      <div>Создать уроки</div>
      <div>Создать тексты для чтения</div>
    </div>
  )
}