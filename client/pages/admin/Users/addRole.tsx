import React, { useState, useEffect } from "react";
import Admins from "../../HOC/admin";
import { toast } from "react-toastify";
import Sidenav from "../../../src/components/Admin_Component/SideNav";
import { Form, Layout, Table, Input, Button, Select } from "antd";
import Link from "next/link";
const addRole = () => {
  const [adminsData, setAdminsData] = useState([]);
  const token = localStorage.token;
  const [email, setUserEmail] = useState("");
  const [role, setUserROle] = useState("");
  const { Header, Sider, Content } = Layout;
  const { Option } = Select;
  const [form] = Form.useForm();
  // ? Tables
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  const data = adminsData;

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = async (values: any) => {
    setUserEmail(values.user_email);
    setUserROle(values.user_role);
    let user_email = values.user_email;
    let user_role = values.user_role;
    // ! Chnage condition
    if (
      token ==
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNDNjM2UxNTEtODNjZC00NDJhLWFhNzktN2EzYzRkNDI0NmZjIiwiaWF0IjoxNjQ2NDE5NDE5LCJleHAiOjE2NDY0MjMwMTl9.PXCyNgTpIBxjlb1qo2gQmW6qrn1yUbkqC7ffoZmaSNA"
    ) {
      if (user_email != "sherchananish11@gmail.com") {
        try {
          const body = { user_email, user_role };
          const response = await fetch("http://localhost:5000/admin/userRole", {
            method: "PUT",
            headers: {
              token: localStorage.token,
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const parseRes = await response.json();
          setUserEmail("");
          setUserROle("");
          onReset();
          toast.success("User Updated!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } catch (error) {
          console.log(error.message);
        }
      } else {
        onReset();
        toast.error("Cannot Edit super Admin!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      onReset();
      toast.error("Super Admin can only edit users!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const admins = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/userRole", {
        method: "get",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      });
      const parseRes = await response.json();
      setAdminsData(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    admins();
  }, [email]);

  return (
    <Layout>
      <Sider>
        {/* Navigation bar for admin */}
        <Sidenav />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "#F3F6F7" }}>
          <h1 className="text-xl text-center p-4">Assign Role to the user</h1>
        </Header>
        <Content style={{ backgroundColor: "#e1e5e8" }}>
          <div className="fixed bg-primaryButton p-1 px-4 rounded-xl z-10 bottom-0 right-0 m-3">
            <Link href="/dashboard">
              <a className="text-white">User pannel</a>
            </Link>
          </div>
          <div>
            <div className="md:flex md:flex-col md:items-center ">
              <h1 className="text-xl heading mt-5">Assign role to users</h1>
              <div className="h-fitcontent p-5 md:w-11/12 md:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
                <p className="text-center text-xl">List of all admins</p>
                <Table bordered columns={columns} dataSource={data} />
              </div>
              <div className=" h-fitcontent p-5 md:w-11/12 md:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
                <Form
                  name="Roles"
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="user_email"
                    label="User Email"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="user_role"
                    label="Select Role"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Assign Role" allowClear>
                      <Option value="user">User</Option>
                      <Option value="admin">Admin</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admins(addRole);
