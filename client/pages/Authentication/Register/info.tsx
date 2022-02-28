import React, { useState, useEffect } from "react";
import Header from "@components/AppHeader/Header";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Form, Select, Modal, Input, Button, DatePicker, Radio } from "antd";

const info = () => {
  // ? variables for Module
  let condition;
  let height = 0;
  let weight = 0;
  let gender = "";
  let dob = "";
  let goal = "";
  const dateFormat = "YYYY-MM-DD";
  const Arraycondition = [];

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

  const userhealth = async () => {
    try {
      const body = { condition };
      const response = await fetch(
        "http://localhost:5000/dashboard/userhealth",
        {
          method: "POST",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      console.log(parseRes);
      router.push("/Authentication/Register/info");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleOk = async () => {
    if (Arraycondition.length != 0) {
      let User_condition = [...Arraycondition[Arraycondition.length - 1]];
      for (let i = 0; i < User_condition.length; i++) {
        condition = User_condition[i];
        userhealth();
      }
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleChange(value) {
    Arraycondition.push(value);
  }
  //   ? Date
  function onChangeDate(date, dateString) {
    dob = dateString;
    console.log(dob);
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

  // ? Post Request for User info
  const onFinish = async () => {
    try {
      const body = { gender, dob, weight, height, goal };
      const response = await fetch("http://localhost:5000/dashboard/userinfo", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes) {
        toast.success("User Information Collected!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/userinfo", {
        method: "get",
        headers: {
          token: localStorage.token,
        },
      });
      const parseRes = await response.json();
      if (parseRes == "Not Authorize") {
        router.push("/");
      }
      if (parseRes == 1) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Radio.Group onChange={onChange}>
                  <Radio value={"Male"}>Male</Radio>
                  <Radio value={"Female"}>Female</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Date of birth"
                name="dob"
                rules={[{ required: true, message: "Date of Birth!" }]}
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%", borderRadius: "15px" }}
                  format={dateFormat}
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
                  <Radio value={"Get Fit"}>Get Fit</Radio>
                  <Radio value={"Build Muscle"}>Build Muscle</Radio>
                </Radio.Group>
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
