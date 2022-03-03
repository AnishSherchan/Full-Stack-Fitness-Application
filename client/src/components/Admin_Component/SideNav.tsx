import React from "react";
import { Menu, Button, Layout } from "antd";
import Image from "next/image";
import { PieChartOutlined, DesktopOutlined } from "@ant-design/icons";
import Link from "next/link";
const SideNav = () => {
  const { SubMenu } = Menu;
  return (
    <div className="">
      <div>
        <div className="flex-shrink-0 bg-navcolor">
          <Image
            className=""
            src="/icons/Logo.svg"
            alt="Logo"
            width={200}
            height={80}
          />
        </div>
      </div>
      <div style={{ width: 200, height: "100vh", backgroundColor: "#001529" }}>
        <Menu mode="inline" theme="dark">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link href="/admin">Dashboard</Link>
          </Menu.Item>
          <SubMenu icon={<DesktopOutlined />} title="Users">
            <Menu.Item>
              <Link href="/admin/Users">Check Users</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/admin/Users/addRole">Add Role to Users</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu icon={<DesktopOutlined />} title="Exercises">
            <Menu.Item>
              <Link href="/admin/Exercise">Check Exercises</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/admin/Exercise/addExercise">Add Exercises</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu icon={<DesktopOutlined />} title="Supplements">
            <Menu.Item>
              <Link href="/admin/Supplement">Check Supplements</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/admin/Supplement/addSupplement">
                Add Supplements
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu icon={<DesktopOutlined />} title="Workout Plans">
            <Menu.Item key="2">
              <Link href="/admin/Plan">Check Plans</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link href="/admin/Plan/addPlan">Add plans </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default SideNav;
