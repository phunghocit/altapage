import { useLocation, useNavigate } from "react-router-dom";
import {MenuItemLogout,DropdownMenuItem, Sidebar, Main, Header, Content, Layout, Logo, Title, ToggleSidebarButton, MenuItem} from "./styles";
import AuthUser from "./AuthUser";
import {MoreOutlined ,LogoutOutlined, BoxPlotOutlined,AppstoreOutlined,MessageOutlined,AreaChartOutlined ,MenuFoldOutlined, RadarChartOutlined,DesktopOutlined,SettingOutlined } from "@ant-design/icons";
import { ReactNode, useState } from "react";
import { Button,Dropdown,MenuProps,Select, Space } from "antd";
import LogoAlta from '../../shared/images/LogoAlta.png'
interface Props {
  children?: ReactNode,
  title?:any
}

const PrivateLayout = ({ children, title }:Props) => {
  const [className, setClassName] = useState("");
  const [activeMenu, setActiveMenu] = useState("users");
  const location = useLocation();

  const toggleSidebar = () =>{
    setClassName(className === "active" ? "" : "active");
  }

  const toggleMenu = async (e:any) => {
    const pathName = await location.pathname.substring(1);
    console.log(e.target.name + " " + pathName);
  }
  const imgage=   <img src={LogoAlta} className="logo Alta" alt="Alta logo" width='120px'/>

  const navigate = useNavigate();

  const logout = () => {
      localStorage.removeItem('token')
      navigate(`/`)
  }
  const items: MenuProps["items"] = [
    {
      label: <MenuItem to="/RoleManagement/Table"> Quản lý vài trò </MenuItem>,
      key: "0",
    },
    {
      label: <MenuItem to="/AccountManagement"> Quản lý tài khoản </MenuItem>,
      key: "1",
    },
    {
      label: <MenuItem to="/UserLogs"> Nhật ký người dùng </MenuItem>,
      key: "2",
    },
  ];
          // options={[
        //   { value: "qlvt", label: "Quản lý vai trò" },
        //   { value: "qltk", label: "Quản lý tài khoản" },
        //   { value: "nknd", label: "Nhật ký người dùng" },
        // ]}
  return (
    <Layout className={className}>
      <Sidebar>
        <Logo>{className === "active" ? <RadarChartOutlined /> : imgage}</Logo>
        <MenuItem to="/Dashboard">
          <AppstoreOutlined /> Dashboard
        </MenuItem>
        <MenuItem to="/DevicePage/Table">
          <DesktopOutlined /> Thiết bị
        </MenuItem>
        <MenuItem to="/ServiceManagement/Table">
          <MessageOutlined /> Dịch vụ
        </MenuItem>
        <MenuItem to="/NumberLevel/Table">
          <BoxPlotOutlined /> Cấp số
        </MenuItem>
        <MenuItem to="/Report">
          <AreaChartOutlined /> Báo cáo
        </MenuItem>

          {/* <SettingOutlined /> */}
          <DropdownMenuItem menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              <SettingOutlined />Cài đặt hệ thống
                <MoreOutlined />
              </Space>
            </a>
          </DropdownMenuItem>


        <MenuItemLogout to="/" onClick={logout}>
          <LogoutOutlined /> Đăng xuất
        </MenuItemLogout>
      </Sidebar>
      <Main>
        <Header>
          <Title>
            <ToggleSidebarButton onClick={toggleSidebar}>
              <MenuFoldOutlined />
            </ToggleSidebarButton>
            {title}
          </Title>
          <AuthUser />
        </Header>
        <Content>{children}</Content>
      </Main>
    </Layout>
  );
};

export default PrivateLayout;
