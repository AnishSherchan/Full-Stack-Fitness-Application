import React, { useState, useEffect } from "react";
import Verify from "./HOC/Verify";
import ListNotes from "../src/components/Notes";
import { Form, Input, Button } from "antd";
import Nav from "../src/components/AppHeader/Header";
const Notes = () => {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = async (values: any) => {
    const { notes } = values;
    try {
      const body = { notes };
      const response = await fetch("http://localhost:5000/notes/notes", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
        // ? converting object to json
      });

      const parseRes = await response.json();
      console.log(parseRes);
      window.location.href = "/Notes";
    } catch (err) {
      console.error(err.message);
    }
    onReset();
  };
  return (
    <div>
      <Nav buttons={false} verifyContent={true} CurrentPage={0} />
      {/* Content */}
      <div className="p-2 mt-2">
        <h1 className="text-3xl text-center font-medium">Notes</h1>
        <div className="flex flex-wrap justify-center">
          <Form name="notes" form={form} layout="inline" onFinish={onFinish}>
            <Form.Item
              name="notes"
              rules={[
                { required: true, message: "Please enter empty notes!!" },
              ]}
            >
              <Input
                size="large"
                style={{
                  width: "300px",
                  height: "50px",
                  borderRadius: "10px",
                }}
                placeholder="Any Notes??"
              />
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{
                  borderRadius: "15px",
                  fontSize: "18px,",
                  fontWeight: "bold",
                }}
                block
              >
                Add Notes
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <ListNotes />
        </div>
      </div>
    </div>
  );
};

export default Verify(Notes);
