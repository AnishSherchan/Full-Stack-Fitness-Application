import React, { useState, useEffect } from "react";
import Admins from "../../HOC/admin";
import { toast } from "react-toastify";
import { Form, Layout, Input, Button, Select } from "antd";
import Sidenav from "../../../src/components/Admin_Component/SideNav";
import Link from "next/link";
const addExercise = () => {
  const [id, setId] = useState(0);
  const { Option } = Select;
  const { Header, Sider, Content } = Layout;
  const onFinish = async (values: any) => {
    if (id == values.ex_id) {
      let ex_id = values.ex_id;
      let exercise_name = values.exercise_name;
      let target_muscle = values.target_muscle;
      let exercise_type = values.exercise_type;
      let equipment_required = values.equipment_required;
      let mechanics = values.mechanics;
      let force_type = values.force_type;
      let url = values.url;
      try {
        const body = {
          ex_id,
          exercise_name,
          target_muscle,
          exercise_type,
          equipment_required,
          mechanics,
          force_type,
          url,
        };
        const response = await fetch("http://localhost:5000/admin/exercise", {
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
        "http://localhost:5000/dashboard/exercises",
        {
          method: "get",
        }
      );
      const parseRes = await response.json();
      let next = 1;
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
            <h1 className="text-xl text-center p-4">Add Exercise</h1>
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
              <h1 className="text-xl heading mt-5">Add Exercise Information</h1>
              <p className="text-right mb-0">Next id: {id}</p>
              <div className=" h-fitcontent p-5 md:w-11/12 md:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
                <Form
                  name="exercise"
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="ex_id"
                    label="Exercise ID"
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
                    name="exercise_name"
                    label="Exercise Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="target_muscle"
                    label="Target Muscle"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select Muscle type" allowClear>
                      <Option value="Chest">Chest</Option>
                      <Option value="Back">Back</Option>
                      <Option value="Shoulders">Shoulders</Option>
                      <Option value="Arms">Arms</Option>
                      <Option value="Leg">Leg</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="exercise_type"
                    label="Exercise Type"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select Exercise type" allowClear>
                      <Option value="Strength">Strength</Option>
                      <Option value="Body Weight">Body Weight</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="equipment_required"
                    label="Equipment Required"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select Equiplemnt" allowClear>
                      <Option value="Dumbbell">Dumbbell</Option>
                      <Option value="Barbell">Barbell</Option>
                      <Option value="Machine">Machine</Option>
                      <Option value="None">None</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="mechanics"
                    label="Mechanics"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select Mechanics" allowClear>
                      <Option value="Isolate">Isolate</Option>
                      <Option value="Compound">Compound</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="force_type"
                    label="Force Type"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select Force type" allowClear>
                      <Option value="Push">Push</Option>
                      <Option value="Pull">Pull</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="url"
                    label="Youtube Video Url"
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

export default Admins(addExercise);
