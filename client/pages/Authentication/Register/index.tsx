import Header from "@components/AppHeader/Header";
import React, { useState } from "react";
import Link from "next/Link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const index = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    const { email, password, name } = values;
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        toast.success("User Registered");
        router.push("/dashboard");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <Header buttons={false} />
      <div className="md:flex md:flex-col md:items-center">
        <div className=" h-fitcontent md:w-5/12 md:bg-navcolor rounded-3xl drop-shadow-2xl md:mt-11">
          <h1 className="text-2xl mt-10 heading text-center">
            BECOME A GUARDIAN MEMBER
          </h1>
          <div className="mt-10 px-8">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  size="large"
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    fontSize: "25px",
                  }}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Enter your Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    fontSize: "25px",
                  }}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Enter your Password!"
                />
              </Form.Item>

              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please enter your name!" }]}
              >
                <Input
                  size="large"
                  style={{
                    height: "50px",
                    borderRadius: "10px",
                    fontSize: "20px",
                  }}
                  placeholder="Enter your name"
                />
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
                  Next
                </Button>
              </Form.Item>
            </Form>
            <p className="text-center text-slate-500 mb-0">
              Already Have An Account?
            </p>
            <Link href="/Authentication/Login">
              <p className="text-center cursor-pointer text-primaryButton">
                Login.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default index;
