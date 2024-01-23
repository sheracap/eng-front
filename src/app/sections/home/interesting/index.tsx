import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import { $coursesList, $tomatoes, $createTomato, $updateTomato, $deleteTomato } from "#stores/courses";
import { ROUTES } from "#constants/index";

export const Interesting = () => {
  const history = useHistory();

  const coursesListState = useStore($coursesList.store);
  const tomatoesListState = useStore($tomatoes.store);
  const createTomatoState = useStore($createTomato.store);
  const updateTomatoState = useStore($updateTomato.store);
  const deleteTomatoState = useStore($deleteTomato.store);

  useEffect(() => {
    $coursesList.effect();
    $tomatoes.effect({});
  }, []);

  const onOpenCourse = (id: number) => {
    history.push(`${ROUTES.COURSES}/${id}`);
  };

  const onCreateTomato = () => {
    $createTomato.effect({
      email: "test@gmail.com"
    });
  }

  const onUpdateTomato = () => {
    $updateTomato.effect({
      id: 2,
      parentId: 1
    });
  };

  return (
    <div>
      <div onClick={onCreateTomato}>Create</div>
      <div onClick={onUpdateTomato}>Update</div>
      <h1>Интересное</h1>
      <h2>Курсы</h2>

      {tomatoesListState.data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      <div className="courses">
        {coursesListState.data.rows.map((item) => (
          <div className="courses__item" key={item.id} onClick={() => onOpenCourse(item.id)}>
            <div className="courses__item__image">
              {item.img && (
                <img src={`http://localhost:5000/${item.img}`} alt=""/>
              )}
            </div>
            <div className="courses__item__name">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};