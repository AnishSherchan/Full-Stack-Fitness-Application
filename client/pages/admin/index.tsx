import React from "react";
import Admins from "../HOC/admin";
import { Menu, Button, Layout } from "antd";
import Image from "next/image";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";
import Link from "next/link";
const admindashboard = () => {
  const { SubMenu } = Menu;
  const { Header, Sider, Content } = Layout;
  return (
    <div>
      <Layout>
        <Sider>
          {/* Navigation bar for admin */}
          <div>
            <div className="flex-shrink-0 bg-navcolor">
              <Image
                className=""
                src="/icons/Logo.svg"
                alt="Logo"
                width={270}
                height={80}
              />
            </div>
          </div>

          <div style={{ width: 200, height: "100vh" }}>
            <Menu mode="inline" theme="dark">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Dashboard
              </Menu.Item>
              <SubMenu icon={<DesktopOutlined />} title="Users">
                <Menu.Item>Check Users</Menu.Item>
                <Menu.Item>Add Role to Users</Menu.Item>
              </SubMenu>
              <SubMenu icon={<DesktopOutlined />} title="Exercises">
                <Menu.Item>Check Exercises</Menu.Item>
                <Menu.Item>Add Exercises</Menu.Item>
              </SubMenu>
              <SubMenu icon={<DesktopOutlined />} title="Supplements">
                <Menu.Item>Check Supplements</Menu.Item>
                <Menu.Item>Add Supplements</Menu.Item>
              </SubMenu>
              <SubMenu icon={<DesktopOutlined />} title="Workout Plans">
                <Menu.Item key="2">Check Plans</Menu.Item>
                <Menu.Item key="5">
                  <Link href="/admin/addPlan">Add plans </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: "#F3F6F7" }}>
            <h1 className="text-xl text-center p-4">Admin Dashboard</h1>
          </Header>
          <Content style={{ backgroundColor: "#e1e5e8" }}>
            <div>Content</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admins(admindashboard);
