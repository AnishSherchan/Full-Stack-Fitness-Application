import React, { useState, useEffect } from "react";
import Admins from "../../HOC/admin";
import { toast } from "react-toastify";
import { Form, Layout, Input, Button } from "antd";
import Sidenav from "../../../src/components/Admin_Component/SideNav";
import Link from "next/link";
const addSupplement = () => {
  const [id, setId] = useState(0);
  const { Header, Sider, Content } = Layout;
  const onFinish = async (values: any) => {
    if (id == values.supplement_id) {
      let supplement_id = values.supplement_id;
      let supplement_name = values.supplement_name;
      let company = values.company;
      let description = values.description;
      let tips = values.tips;
      let energy = values.Energy;
      let protein = values.protien;
      let carbs = values.carbs;
      let fat = values.fat;
      let image_url = values.image_url;
      try {
        const body = {
          supplement_id,
          supplement_name,
          company,
          description,
          tips,
          energy,
          protein,
          carbs,
          fat,
          image_url,
        };
        const response = await fetch("http://localhost:5000/admin/supplement", {
          method: "POST",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
        console.log(parseRes);
        onReset();
        toast.success("Supplement Added!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        getnextId();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("Id doesn't Match!!", {
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
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const getnextId = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/supplements",
        {
          method: "get",
        }
      );
      const parseRes = await response.json();
      let next = 2;
      next += parseRes.length;
      setId(next);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getnextId();
  }, []);
  return (
    <Layout>
      <Sider>
        {/* Navigation bar for admin */}
        <Sidenav />
      </Sider>
      <Layout>
        <div className="z-10 mb-4 sticky top-0 left-0 right-0">
          <Header style={{ backgroundColor: "#F3F6F7" }}>
            <h1 className="text-xl text-center p-4">Add Supplement</h1>
          </Header>
        </div>
        <Content style={{ backgroundColor: "#e1e5e8" }}>
          <div className="fixed bg-primaryButton p-1 px-4 rounded-xl z-10 bottom-0 right-0 m-3">
            <Link href="/dashboard">
              <a className="text-white">User panel</a>
            </Link>
          </div>
          <div>
            <div className="md:flex md:flex-col  md:items-center ">
              <h1 className="text-xl heading mt-5">
                Add Supplements Information
              </h1>
              <p className="text-right mb-0">Next id: {id}</p>
              <div className=" h-fitcontent p-5 md:w-11/12 md:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
                <Form
                  name="plan"
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="supplement_id"
                    label="Supplement ID"
                    rules={[{ required: true }]}
                  >
                    <Input
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="supplement_name"
                    label="Supplement Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="company"
                    label="Company Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="tips"
                    label="Tips"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="Energy"
                    label="Energy pre serving"
                    rules={[{ required: true }]}
                  >
                    <Input
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="Protein"
                    label="Protien pre serving"
                    rules={[{ required: true }]}
                  >
                    <Input
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="carbs"
                    label="Carbs pre serving"
                    rules={[{ required: true }]}
                  >
                    <Input
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="fat"
                    label="Fats pre serving"
                    rules={[{ required: true }]}
                  >
                    <Input
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="image_url"
                    label="Image URL"
                    rules={[{ required: true }]}
                  >
                    <Input />
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

export default Admins(addSupplement);
