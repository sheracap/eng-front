import React, { FC, ReactNode, useEffect, useState } from "react";

import { ROUTES } from "#constants/index";
import { HomeSvgIcon, MonitoringSvgIcon, SettingSvgIcon } from "#svgIcons/menuIcons";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

import "./styles.scss";

const getMenuData = () => [
  {
    name: "Главная",
    path: ROUTES.MAIN,
    icon: <HomeSvgIcon />,
    linkProps: { exact: true },
  },
  {
    name: "Мониторинг",
    key: ROUTES.MONITORING,
    icon: <MonitoringSvgIcon />,
    sub: [
      {
        name: "Компании",
        path: ROUTES.COMPANIES,
      },
      {
        name: "Филиалы",
        path: ROUTES.BRANCHES,
      },
      {
        name: "Сотрудники",
        path: ROUTES.EMPLOYEES,
      },
      {
        name: "Склад",
        path: ROUTES.WAREHOUSE,
      },
      {
        name: "Поставщики",
        path: ROUTES.SUPPLIERS,
      },
      {
        name: "Клиенты",
        path: ROUTES.CLIENTS,
      },
      {
        name: "Счет-фактуры",
        path: ROUTES.INVOICE,
      },
      {
        name: "Бонусы сотрудникам",
        path: ROUTES.EMPLOYEE_BONUSES,
      },
    ],
  },
  {
    name: "Управление",
    key: ROUTES.SETTINGS,
    icon: <SettingSvgIcon />,
    sub: [
      {
        name: "Админ",
        path: ROUTES.ADMIN,
      },
      {
        name: "Кабинет",
        path: ROUTES.CABINET,
      },
    ],
  },
];

const findOpenKeysInTree = (tree, path, parents) => {
  if (!tree || !tree.length) {
    return null;
  }

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    const newParents = [...parents];

    newParents.push(item.path || item.key);

    if (item.path === path || item.key === path) {
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

  const menuData = getMenuData();

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
        key: item.path || item.key,
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
    <div className="left-menu-wrapper u-fancy-scrollbar">
      <Menu mode="inline" className="left-menu" {...menuProps} items={getMenu(menuData)} />
    </div>
  );
};
