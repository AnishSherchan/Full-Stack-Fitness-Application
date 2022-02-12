import Header from "@components/AppHeader/Header";
import Link from "next/Link";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onFinish = async (values: any) => {
    const { email, password } = values;
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
        // ? converting object to json
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        toast.success("Logged in Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        router.push("/dashboard");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="parent h-screen bg-bgcolor">
      <Header buttons={false} />
      <div className="p-5 mt-14 shadow-xl container ">
        <h1 className="text-3xl mt-5 heading text-center">Welcome Back</h1>
        <div className="mt-14 px-8">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
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
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <Link href="/Authentication/Register">
                <Button
                  size="large"
                  style={{
                    borderRadius: "15px",
                    fontSize: "18px,",
                    fontWeight: "bold",
                    boxShadow: "3px 3px rgba(0, 0, 0, 0.15)",
                    color: "#607FE8",
                    border: "1px solid #D0D0D0",
                  }}
                  block
                >
                  Create An Account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default index;
