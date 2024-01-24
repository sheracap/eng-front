import React, { FC, useEffect, useMemo } from "react";

import { ContentUI } from "#ui/content";
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { MainUserBar } from "#src/app/sections/home/userBar";
import { Interesting } from "./interesting";
import { MyCourses } from "./myCourses";
import { MyStudents } from "./myStudents";

import "./styles.scss";

type PropTypes = {
  matchUrl: string;
};

export const Home: FC<PropTypes> = (props) => {
  const {  } = props;

  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === match.url) {
      history.push(folders[0].path);
    }
  }, [location.pathname]);

  const folders = useMemo(() => {
    return [
      { name: "Интересное", path: `${match.url}/interesting`, component: Interesting },
      { name: "Мои курсы", path: `${match.url}/my-courses`, component: MyCourses },
      { name: "Мои ученики", path: `${match.url}/students`, component: MyStudents },
    ];
  }, []);

  return (
    <ContentUI>
      <div className="main-content">
        <div className="main-content__left">
          <MainUserBar />
        </div>
        <div className="main-content__right">
          <Switch>
            {folders.map((item) => (
              <Route key={item.path} path={item.path} component={item.component} />
            ))}
          </Switch>
        </div>
      </div>
    </ContentUI>
  );
};
