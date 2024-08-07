import React, { FC, useEffect, useState } from "react";

import { ROUTES } from "#constants/index";
import { $currentUser } from "#stores/account";
import { Spinner } from "#ui/spinner";
import { Layout } from "antd";
import { useStore } from "effector-react";
import { Route, Switch, useLocation } from "react-router-dom";

import { useRole } from "#hooks/useRole";

import { Events } from "#src/app/sections/events";
import { Courses } from "#src/app/sections/courses";
import { Lessons } from "#src/app/sections/lessons";
import { Students } from "#src/app/sections/students";
import { Books } from "#src/app/sections/books";
import { Vocabulary } from "#src/app/sections/vocabulary";
import { Homework } from "#src/app/sections/homework";
import { Pronunciation } from "#src/app/sections/pronunciation";

import { HeaderUI } from "./header";
import { SideNavigation } from "./sideNavigation";

import "./styles.scss";

const { Content } = Layout;

export const Main: FC = () => {

  const location = useLocation();

  const currentUserState = useStore($currentUser.store);

  const { data: currentUser } = currentUserState;

  const [siderOpened, setSiderOpened] = useState(false);

  const { isStudent, isTeacher } = useRole();

  useEffect(() => {
    $currentUser.effect();

    return () => {
      $currentUser.reset();
    };
  }, []);

  useEffect(() => {
    if (siderOpened) {
      setSiderOpened(false);
    }
  }, [location]);

  if (!currentUser) {
    return (
      <div className="site-wrapper__spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="site-wrapper">
      <Layout className="site-wrapper__in">
        <SideNavigation collapsed={siderOpened} />
        <Layout className="site-wrapper__layout">
          <HeaderUI siderOpened={siderOpened} setSiderOpened={setSiderOpened} />
          <Content>
            <div className="site-wrapper__content-main">
              <Switch>
                <Route path={ROUTES.EVENTS} component={Events} />
                <Route path={ROUTES.COURSES} component={Courses} />
                <Route path={ROUTES.LESSONS} component={Lessons} />
                <Route path={ROUTES.STUDENTS} component={Students} />
                <Route path={ROUTES.PRONUNCIATION} component={Pronunciation} />
                {isStudent && (
                  <>
                    <Route path={ROUTES.BOOKS} component={Books} />
                    <Route path={ROUTES.VOCABULARY} component={Vocabulary} />
                    <Route path={ROUTES.HOMEWORK} component={Homework} />
                  </>
                )}
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
