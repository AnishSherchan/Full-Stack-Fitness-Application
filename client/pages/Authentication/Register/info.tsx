import React, { useState } from "react";
import Header from "@components/AppHeader/Header";
import Link from "next/Link";
import { useRouter } from "next/router";
import { Form, Select, Modal, Input, Button, DatePicker, Radio } from "antd";

const info = () => {
  // ? variables for Module
  let height = 0;
  let weight = 0;
  let gender = "";
  let DOB = "";
  let goal = "";
  const condition = [];

  const router = useRouter();
  //   ? onchange function for user selecttion gender
  const onChange = (e) => {
    gender = e.target.value;
  };

  //   ? For Health conditions
  const { Option } = Select;
  const children = [];
  const disease = [
    "Hearth diseas",
    "Cancer",
    "Dementia",
    "Stroke",
    "High Blood pressure",
    "Diabetes type 2",
    "Diabetes",
    "Back pain",
    "Arthritis",
    "COPD",
    "Osteoporosis",
    "Chronic Pain",
    "Cholesterol",
  ];
  for (let i = 0; i < disease.length; i++) {
    children.push(<Option key={i + 1}>{disease[i]}</Option>);
  }
  //   !modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log(condition[condition.length - 1]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleChange(value) {
    condition.push(value);
  }
  //   ? Date
  function onChangeDate(date, dateString) {
    DOB = dateString;
  }
  // ? Goal
  const onChangeGoal = (e) => {
    goal = e.target.value;
  };
  const UserinputHeight = (e) => {
    height = e.target.value;
  };
  const UserinputWeight = (e) => {
    weight = e.target.value;
  };
  const onFinish = () => {
    console.log(weight);
    console.log(height);
    console.log(gender);
    console.log(DOB);
    console.log(goal);
  };
  return (
    <div>
      <Header buttons={false} verifyContent={false} CurrentPage={0} />
      <div className="md:flex md:flex-col md:items-center ">
        <div className=" h-fitcontent md:w-5/12 md:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
          <h1 className="text-2xl mt-10 heading text-center">
            Tell us about yourself:
          </h1>
          <div className="mt-10 px-8">
            <Form
              name="normal_login"
              className="login-form"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Radio.Group onChange={onChange}>
                  <Radio value={"male"}>Male</Radio>
                  <Radio value={"female"}>Female</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Date of birth"
                name="DOB"
                rules={[{ required: true, message: "Date of Birth!" }]}
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%", borderRadius: "15px" }}
                  onChange={onChangeDate}
                />
              </Form.Item>

              <Form.Item
                name="weight"
                rules={[
                  { required: true, message: "Please enter your weight!" },
                ]}
              >
                <Input
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => UserinputWeight(e)}
                  size="large"
                  style={{
                    borderRadius: "10px",
                    fontSize: "17px",
                  }}
                  placeholder="Weight/KGS"
                />
              </Form.Item>

              <Form.Item
                name="height"
                rules={[
                  { required: true, message: "Please enter your height!" },
                ]}
              >
                <Input
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => UserinputHeight(e)}
                  size="large"
                  style={{
                    borderRadius: "10px",
                    fontSize: "17px",
                  }}
                  placeholder="Height/m"
                />
              </Form.Item>

              <Form.Item
                label="What is your goal?"
                name="Goal"
                rules={[{ required: true, message: "Please Select Goal!" }]}
              >
                <Radio.Group
                  name="radiogroup"
                  onChange={onChangeGoal}
                  defaultValue={1}
                >
                  <Radio value={"Fat Loss"}>Lose Weight</Radio>
                  <Radio value={"Get Fit"}>Get Toned</Radio>
                  <Radio value={"Build Muscle"}>Build Muscle</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Do you have any Health Conditions?">
                <Button
                  style={{
                    marginRight: "20px",
                    borderRadius: "10px",
                    width: "60px",
                  }}
                  type="primary"
                  onClick={showModal}
                >
                  Yes
                </Button>
                <Button
                  style={{
                    borderRadius: "10px",
                    width: "60px",
                  }}
                >
                  No
                </Button>
                <Modal
                  bodyStyle={{ height: "400px" }}
                  title="Select Health Condition"
                  width={600}
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p className="text-sky-600">
                    If your health condition is not listed below please consult
                    your tainer or doctor!
                  </p>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={handleChange}
                  >
                    {children}
                  </Select>
                </Modal>
              </Form.Item>

              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login"
                  style={{
                    borderRadius: "15px",
                    fontSize: "18px,",
                    fontWeight: "bold",
                    boxShadow: "3px 3px rgba(0, 0, 0, 0.15)",
                  }}
                  block
                >
                  Start Workout
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default info;
