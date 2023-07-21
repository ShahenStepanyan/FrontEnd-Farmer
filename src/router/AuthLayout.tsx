import { useContext, useMemo, useEffect } from "react";
import OneSignal from "react-onesignal";
import { Breadcrumb, Button, Dropdown, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GitlabFilled,
  DollarOutlined,
  GitlabOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import AnimalTypesProvider from "../context/AnimalTypesContext";
import AnimalProvider from "../context/AnimalContext";
import SelectFieldsProvider from "../context/SelectFieldsContext";
import { locales, LocaleKeys, changeLanguage } from "../i18n";
import useLocalStorage from "../hooks/useLocalStorage";
import usePathPattern from "../hooks/usePathPattern";
import notificationsService from "../services/notifications";
import { breadcrumbMap } from "./routes";
import { RoleEnum } from "../types/User";
import "./styles.less";

const { Sider, Header, Content } = Layout;

const AuthLayout = () => {
  const pathPattern = usePathPattern();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useLocalStorage("sider-collapsed", false);
  const [locale, setLocale] = useLocalStorage<LocaleKeys>("locale", "en");
  const { user, logout } = useContext(UserContext);

  const CollapseIcon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;

  const handleLocaleChange = (key: LocaleKeys) => {
    changeLanguage(key);
    setLocale(key);
  };
  
  const selectedKey = useMemo(() => {
    if (!pathPattern?.pattern?.path) {
      return "/";
    }
    if (pathPattern.pattern.path.endsWith("/:id")) {
      return pathPattern.pattern.path.substring(
        0,
        pathPattern.pattern.path.length - 4
      );
    }

    return pathPattern.pattern.path;
  }, [pathPattern?.pattern?.path]);

  useEffect(() => {
    if (!user?.token) {
      return;
    }

    OneSignal.init({
      appId: process.env.REACT_APP_ONE_SIGNAL_APP_ID as string,
    });
    OneSignal.addListenerForNotificationOpened(async (item) => {
      // @ts-ignore
      await notificationsService.seen(item.id);
    });

    async function onSubscriptionChange(isSubscribed?: boolean) {
      const userId = (await OneSignal.getUserId()) as string;
      await notificationsService.subscriptionChange(userId, isSubscribed);
    }

    OneSignal.on("subscriptionChange", onSubscriptionChange);
    return () => {
      OneSignal.off("subscriptionChange", onSubscriptionChange);
    };
  }, [user?.token]);

  const menuItems = useMemo(() => {
    const items = [
      { key: "/", label: "Dasboard", icon: <LineChartOutlined /> },
      { key: "/animals", label: "Animals", icon: <GitlabOutlined /> },
      {
        key: "/select-fields",
        label: "Select Fields",
        icon: <UnorderedListOutlined />,
      },
      { key: "/spending", label: "Spendings", icon: <DollarOutlined /> },
    ];
    if (user?.role === RoleEnum.ADMIN) {
      items.push({ key: "/users", label: "Users", icon: <UserOutlined /> });
    }
    return items;
  }, [user?.role]);

  if (!user?.token) {
    return <Navigate to="/login" />;
  }

  return (
    <AnimalTypesProvider>
      <AnimalProvider>
        <SelectFieldsProvider>
          <Layout style={{ height: "100vh" }} hasSider>
            <Sider collapsible onCollapse={setCollapsed} collapsed={collapsed}>
              <div
                className="logo"
                style={{
                  height: 64,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <GitlabFilled style={{ fontSize: 28, color: "white" }} />
              </div>
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={({ key }) => navigate(key)}
                items={menuItems}
              />
            </Sider>
            <Layout style={{ overflow: "auto" }}>
              <Header className="auth-layout-header">
                <CollapseIcon
                  style={{ fontSize: 18 }}
                  onClick={() => setCollapsed(!collapsed)}
                  className="trigger"
                />
                {pathPattern && breadcrumbMap[pathPattern.pattern.path] && (
                  <Breadcrumb
                    style={{ display: "inline-block", marginLeft: 24 }}
                  >
                    {breadcrumbMap[pathPattern.pattern.path].map(
                      ({ title, path }, index) => (
                        <Breadcrumb.Item key={index}>
                          {path ? <Link to={path}>{title}</Link> : title}
                        </Breadcrumb.Item>
                      )
                    )}
                  </Breadcrumb>
                )}
              </Header>
              <div
                style={{
                  position: "absolute",
                  right: 24,
                  zIndex: 2,
                  top: 16,
                }}
              >
                <Dropdown
                  overlay={
                    <Menu
                      items={Object.entries(locales).map(([key, label]) => ({
                        key,
                        onClick: () => handleLocaleChange(key as LocaleKeys),
                        label,
                      }))}
                    />
                  }
                >
                  <Button type="link">{locales[locale]}</Button>
                </Dropdown>
                <Button onClick={logout}>Logout</Button>
              </div>
              <Content
                className="site-layout-background"
                style={{
                  margin: "64px 16px 24px",
                  padding: 24,
                  minHeight: 280,
                }}
              >
                <Outlet />
              </Content>
            </Layout>
          </Layout>
        </SelectFieldsProvider>
      </AnimalProvider>
    </AnimalTypesProvider>
  );
};

export default AuthLayout;
