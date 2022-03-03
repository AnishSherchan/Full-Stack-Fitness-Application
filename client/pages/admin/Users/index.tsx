import React from "react";
import Admins from "../../HOC/admin";
import Sidenav from "../../../src/components/Admin_Component/SideNav";
import { Layout } from "antd";
import Link from "next/link";

const UserAdmi = () => {
  const { Header, Sider, Content } = Layout;
  return (
    <Layout>
      <Sider>
        {/* Navigation bar for admin */}
        <Sidenav />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "#F3F6F7" }}>
          <h1 className="text-xl text-center p-4">User</h1>
        </Header>
        <Content style={{ backgroundColor: "#e1e5e8" }}>
          <div className="fixed bg-primaryButton p-1 px-4 rounded-xl z-10 bottom-0 right-0 m-3">
            <Link href="/dashboard">
              <a className="text-white">User pannel</a>
            </Link>
          </div>
          <div>Users</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admins(UserAdmi);
