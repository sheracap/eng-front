
import { $currentUser } from "#stores/account";

import { useStore } from "effector-react";

export const useRole = () => {
  const { data: currentUserData } = useStore($currentUser.store);

  return {
    isTeacher: currentUserData.role.code === "TEACHER",
    isStudent: currentUserData.role.code === "STUDENT",
  };
};
