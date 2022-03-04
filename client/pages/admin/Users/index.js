import React, { useEffect, useState } from "react";
import Admins from "../../HOC/admin";
import Sidenav from "../../../src/components/Admin_Component/SideNav";

import Link from "next/link";
import { Layout, Table } from "antd";

const UserAdmi = () => {
  const { Header, Sider, Content } = Layout;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Account Status",
      dataIndex: "status",
    },
  ];
  const [userdata, setuserdata] = useState([]);
  const users = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/usersdata", {
        method: "get",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      });
      const parseRes = await response.json();
      setuserdata(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [totalusers, settotal] = useState(0);
  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/users", {
        method: "get",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      });
      const parseRes = await response.json();
      settotal(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  const data = userdata;
  useEffect(() => {
    users();
    getUsers();
  }, []);
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
          <div className="md:flex md:flex-col md:items-center ">
            <div className="h-fitcontent p-5 md:w-11/12 md:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
              <p className="text-center text-xl">List of all users</p>
              <Table
                title={() => "Total Number of users  " + totalusers}
                bordered
                columns={columns}
                dataSource={data}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admins(UserAdmi);
