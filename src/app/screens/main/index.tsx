import React, { FC, useEffect, useState } from "react";

import { ROUTES } from "#constants/index";
import { Monitoring } from "#src/app/sections/monitoring";
import { $currentUser } from "#stores/account";
import { Spinner } from "#ui/spinner";
import { Layout } from "antd";
import { useStore } from "effector-react";
import { Route, Switch, useLocation } from "react-router-dom";

import { Home } from "../../sections/home";

import { HeaderUI } from "./header";
import { SideNavigation } from "./sideNavigation";
import { Courses } from "#src/app/sections/courses";

import "./styles.scss";

const { Content } = Layout;

export const Main: FC = () => {

  const location = useLocation();

  const currentUserState = useStore($currentUser.store);

  const { data: currentUser } = currentUserState;

  const [siderOpened, setSiderOpened] = useState(false);

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
                <Route path={ROUTES.HOME} component={Home} />
                <Route path={ROUTES.COURSES} component={Courses} />
                <Route path={ROUTES.MONITORING} component={Monitoring} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
