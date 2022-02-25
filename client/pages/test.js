import React, { useState } from "react";
import { Select } from "antd";
import { Modal, Button } from "antd";
const test = () => {
  const condition1 = [];
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

  const condition = 1;
  const userhealth = async () => {
    try {
      const body = { condition };
      console.log(body);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleChange(value) {
    condition.push(value);
  }
  const Psuh = () => {
    userhealth();
  };
  return (
    <div>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        onChange={handleChange}
      >
        {children}
      </Select>
      <button onClick={Psuh}> Push</button>
    </div>
  );
};

export default test;
