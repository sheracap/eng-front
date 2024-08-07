import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";

import { ROUTES } from "#constants/index";
import {
  CoursesIcon,
  HomeSvgIcon,
  VocabularyIcon,
  StudentsIcon,
  HomeworkIcon,
  PronunciationIcon,
  LessonsIcon,
  BooksIcon,
} from "#svgIcons/menuIcons";
import { CalendarIcon } from "#src/assets/svg";

import { useRole } from "#hooks/useRole";

import "./styles.scss";


const { Sider } = Layout;

const findOpenKeysInTree = (tree, path, parents) => {
  if (!tree || !tree.length) {
    return null;
  }

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    const newParents = [...parents];

    newParents.push(item.link || item.path || item.key);

    if (item.link === path || item.path === path || item.key === path) {
      return newParents;
    }

    const subParents = findOpenKeysInTree(item.sub, path, newParents);

    if (subParents) {
      return subParents;
    }
  }

  return null;
};

const findOpenKeysInSubPath = (menuData, pathname) => {
  const arrayPath = pathname.split("/");
  arrayPath.splice(-1, 1);

  if (arrayPath <= 1) {
    return null;
  }

  const newPath = arrayPath.join("/");

  const openKeys = findOpenKeysInTree(menuData, newPath, []);

  if (openKeys) {
    return openKeys;
  }

  return findOpenKeysInSubPath(menuData, newPath);
};

const getOpenKeys = (menuData, location) => {
  let openKeys = findOpenKeysInTree(menuData, location.pathname, []);

  if (!openKeys) {
    openKeys = findOpenKeysInSubPath(menuData, location.pathname);
  }

  return openKeys || [];
};

type SideNavigationItem = {
  key: string;
  label: ReactNode;
  children?: SideNavigationList;
  onTitleClick?: ({ key }: { key: string }) => void;
};

type SideNavigationList = Array<SideNavigationItem>;

interface PropTypes {
  collapsed: boolean;
}

export const SideNavigation: FC<PropTypes> = (props) => {
  const { collapsed } = props;

  const location = useLocation();

  const { isStudent, isTeacher } = useRole();

  const menuData = useMemo(() => {
    return [
      {
        name: "Главная",
        path: ROUTES.HOME,
        icon: <HomeSvgIcon />,
        linkProps: { exact: true },
      },

      {
        name: "Курсы",
        path: `${ROUTES.COURSES}`,
        icon: <CoursesIcon />,
      },
      {
        name: "Уроки",
        path: `${ROUTES.LESSONS}`,
        icon: <LessonsIcon />,
      },

      ...(isTeacher ? [
        {
          name: "Расписание",
          path: `${ROUTES.EVENTS}`,
          icon: <CalendarIcon />,
        },
        {
          name: "Мои ученики",
          path: `${ROUTES.STUDENTS}`,
          icon: <StudentsIcon />,
        }
      ] : []),

      ...(isStudent ? [

        {
          name: "Книги",
          path: `${ROUTES.BOOKS}`,
          icon: <BooksIcon />,
        },
        {
          name: "Словарь",
          path: `${ROUTES.VOCABULARY}`,
          icon: <VocabularyIcon />,
        },
        {
          name: "Домашнее задание",
          path: `${ROUTES.HOMEWORK}`,
          icon: <HomeworkIcon />,
        }
      ] : []),

      {
        name: "Произношение",
        path: `${ROUTES.PRONUNCIATION}`,
        icon: <PronunciationIcon />,
      }

    ];
  }, []);

  const [openKeys, setOpenKeys] = useState(getOpenKeys(menuData, location));
  const [menuProps, setMenuProps] = useState({ selectedKeys: openKeys, openKeys: !collapsed ? openKeys : undefined });

  useEffect(() => {
    const menuProps: any = {
      selectedKeys: openKeys,
    };

    if (!collapsed) {
      menuProps.openKeys = openKeys;
    }

    setMenuProps(menuProps);
  }, [openKeys, collapsed]);

  useEffect(() => {
    setOpenKeys(getOpenKeys(menuData, location));
  }, [location.pathname]);

  const onParentClick = ({ key }) => {
    let newOpenKeys = [...openKeys];
    const findIndex = openKeys.findIndex((item) => item === key);

    if (findIndex > -1) {
      newOpenKeys = newOpenKeys.filter((item) => !item.includes(key));
    } else {
      if (openKeys.find((item) => key.includes(item))) {
        newOpenKeys.push(key);
      } else {
        newOpenKeys = [key];
      }
    }

    setOpenKeys(newOpenKeys);
  };

  const getMenu = (menu, level = 1): SideNavigationList => {
    const className = level === 1 ? "left-menu__item" : "left-menu__sub-item";

    const menuStructure: SideNavigationList = [];

    menu.forEach((item) => {
      const menuItem = (
        <div className={className}>
          {item.path ? (
            <NavLink to={item.path} {...item.linkProps}>
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ) : (
            <div className="left-menu__sub-item-link">
              {item.icon}
              <span>{item.name}</span>
            </div>
          )}
        </div>
      );

      const itemObj: SideNavigationItem = {
        key: item.link || item.path || item.key,
        label: menuItem,
      };

      if (item.sub && item.sub.length) {
        menuStructure.push({
          ...itemObj,
          children: getMenu(item.sub, level + 1),
          onTitleClick: onParentClick,
        });
      } else {
        menuStructure.push(itemObj);
      }
    });

    return menuStructure;
  };

  return (
    <Sider className="left-menu-wrapper" theme="light">
      <div className="content-block site-logo">LOGO</div>
      <div className="content-block left-menu">
        <Menu mode="inline" {...menuProps} items={getMenu(menuData)} />
      </div>
    </Sider>
  );
};
