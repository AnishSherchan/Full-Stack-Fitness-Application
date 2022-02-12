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
      <div className="p-5 mt-14 shadow-xl Registercontainer ">
        <h1 className="text-2xl mt-3 heading text-center">
          BECOME A GUARDIAN MEMBER
        </h1>
        <div className="mt-8 px-8">
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

            <Form.Item
              name="Name"
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
  );
};
export default index;
