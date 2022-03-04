import React from "react";
import Admins from "../../HOC/admin";
import { toast } from "react-toastify";
import { Form, Layout, Input, Button, Select } from "antd";
import Sidenav from "../../../src/components/Admin_Component/SideNav";
import Link from "next/link";
const addPlan = () => {
  const { Header, Sider, Content } = Layout;
  const { Option } = Select;
  const onFinish = async (values: any) => {
    let plan_name = values.plan_name;
    let plan_duration = values.plan_duration;
    let plan_type = values.plan_type;
    let health_condition = values.HC;
    let working_days = values.Workingday;
    let permium = values.Premium;
    let url = values.URL;
    let genders = values.gender;
    let age_group = values.age_group;
    try {
      const body = {
        plan_name,
        plan_duration,
        plan_type,
        health_condition,
        working_days,
        permium,
        url,
        genders,
        age_group,
      };
      const response = await fetch("http://localhost:5000/admin/plan", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log(parseRes);
      toast.success("Plan Added!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      onReset();
    } catch (error) {
      console.log(error.message);
    }
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Layout>
      <Sider>
        {/* Navigation bar for admin */}
        <Sidenav />
      </Sider>
      <Layout>
        <div className="z-10 sticky mb-4 top-0 left-0 right-0">
          <Header style={{ backgroundColor: "#F3F6F7" }}>
            <h1 className="text-xl text-center p-4">Add New Workout plans</h1>
          </Header>
        </div>
        <Content style={{ backgroundColor: "#e1e5e8" }}>
          <div className="fixed bg-primaryButton p-1 px-4 rounded-xl z-10 bottom-0 right-0 m-3">
            <Link href="/dashboard">
              <a className="text-white">User pannel</a>
            </Link>
          </div>
          <div>
            <div className="md:flex md:flex-col md:items-center ">
              <h1 className="text-xl heading mt-5">Add Plan Information</h1>
              <div className=" h-fitcontent p-5 md:w-11/12 md:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
                <Form
                  name="plan"
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="plan_name"
                    label="Plan Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="plan_duration"
                    label="Plan duration on Week"
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
                    name="plan_type"
                    label="Plan Type"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select plan type" allowClear>
                      <Option value="Build Muscle">Build Muscle</Option>
                      <Option value="Get Fit">Get Fit</Option>
                      <Option value="Fat Loss">Fat Loss</Option>
                      <Option value="Stretching">Stretching</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="HC"
                    label="Health Condition"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Plan for ill people? " allowClear>
                      <Option value="No">No</Option>
                      <Option value="Yes">Yes</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="Workingday"
                    label="Plan working Days"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Working days per week " allowClear>
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                      <Option value="5">5</Option>
                      <Option value="6">6</Option>
                      <Option value="7">7</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="Premium"
                    label="Premium"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Is plan Premium" allowClear>
                      <Option value="No">No</Option>
                      <Option value="Yes">Yes</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="URL"
                    label="Plan URL"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Select a option and change input text above"
                      allowClear
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="age_group"
                    label="Age group"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select Age group" allowClear>
                      <Option value="Baby">Baby</Option>
                      <Option value="Adult">Adult</Option>
                      <Option value="Middle Aged">Middle Aged</Option>
                      <Option value="Old">Old</Option>
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

export default Admins(addPlan);
