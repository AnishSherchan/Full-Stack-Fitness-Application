import Header from "@components/AppHeader/Header";
import Link from "next/Link";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const index = () => {
  return (
    <div className="parent h-screen bg-bgcolor">
      <Header buttons={false} />
      <div className="p-5 mt-14 shadow-xl container ">
        <h1 className="text-3xl mt-5 text-center">Welcome Back</h1>
        <div className="mt-14 px-8">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
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
