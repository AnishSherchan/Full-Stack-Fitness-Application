import React, { useState } from "react";
import { Select } from "antd";
import { Modal, Button } from "antd";
const test = () => {
  const { Option } = Select;
  const children = [];
  const disease = ["Hearth", "Licer", "brain"];
  for (let i = 0; i < disease.length; i++) {
    children.push(<Option key={disease[i]}>{disease[i]}</Option>);
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const condition = [];
  function handleChange(value) {
    condition.push(value);
  }
  const Onclick = () => {
    console.log(condition[condition.length - 1]);
  };
  return (
    <div>
      test
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          onChange={handleChange}
        >
          {children}
        </Select>
        <button onClick={Onclick}>Hsasasa</button>
      </Modal>
    </div>
  );
};

export default test;
