import React, { useState, useEffect } from "react";
import Admins from "../../HOC/admin";
import Sidenav from "../../../src/components/Admin_Component/SideNav";
import { Layout, Table, Modal, Input, Select } from "antd";
import Link from "next/link";
const { Option } = Select;
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const PlanAdmin = () => {
  const { Header, Sider, Content } = Layout;
  const [exercises, setexercises] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const EditExercise = async (
    plan_id,
    plan_name,
    plan_type,
    health_condition,
    genders,
    age_group,
    url
  ) => {
    try {
      const body = {
        plan_id,
        plan_name,
        plan_type,
        health_condition,
        genders,
        age_group,
        url,
      };
      const response = await fetch("http://localhost:5000/admin/plan", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  const onDeleteStudent = async (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Plan?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        console.log(record.plan_name);
        const plan_id = record.plan_id;
        try {
          const response = await fetch(
            `http://localhost:5000/admin/plan/${plan_id}`,
            {
              method: "DELETE",
            }
          );

          const parseRes = await response.json();
          console.log(parseRes);
          toast.success("Plan Deleted", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } catch (err) {
          console.error(err.message);
        }
        setexercises((pre) => {
          return pre.filter((exe) => exe.plan_id !== record.plan_id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "plan_id",
      sorter: (a, b) => a.plan_id - b.plan_id,
    },
    {
      key: "2",
      title: "Plan Name",
      dataIndex: "plan_name",
    },
    {
      key: "3",
      title: "Plan Type",
      dataIndex: "plan_type",
    },
    {
      key: "4",
      title: "Health Condition",
      dataIndex: "health_condition",
    },

    {
      key: "5",
      title: "Gender",
      dataIndex: "genders",
    },
    {
      key: "6",
      title: "Age Group",
      dataIndex: "age_group",
    },
    {
      key: "7",
      title: "url",
      dataIndex: "url",
    },
    {
      key: "8",
      title: "Action",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const exercisesInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/plan", {
        method: "get",
      });
      const parseRes = await response.json();
      setexercises(parseRes);
      console.log(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    exercisesInfo();
  }, []);
  return (
    <Layout>
      <Sider>
        {/* Navigation bar for admin */}
        <Sidenav />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "#F3F6F7" }}>
          <h1 className="text-xl text-center p-4">Workout Plans</h1>
        </Header>
        <Content style={{ backgroundColor: "#e1e5e8" }}>
          <div className="fixed bg-primaryButton p-1 px-4 rounded-xl z-10 bottom-0 right-0 m-3">
            <Link href="/dashboard">
              <a className="text-white">User panel</a>
            </Link>
          </div>
          <div className="md:flex md:flex-col md:items-center ">
            <div className="h-fitcontent p-5 md:w-11/12 md:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
              <p className="text-center text-xl">Workout Plans</p>
              <Table
                title={() => "Edit Plan"}
                bordered
                columns={columns}
                dataSource={exercises}
              />
            </div>
          </div>
          \
          <Modal
            title="Edit Exercise"
            visible={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              setexercises((pre) => {
                return pre.map((student) => {
                  if (student.plan_id === editingStudent.plan_id) {
                    let plan_id = student.plan_id;
                    let plan_name = editingStudent.plan_name;
                    let plan_type = editingStudent.plan_type;
                    let health_condition = editingStudent.health_condition;
                    let genders = editingStudent.genders;
                    let age_group = editingStudent.age_group;
                    let url = editingStudent.url;
                    EditExercise(
                      plan_id,
                      plan_name,
                      plan_type,
                      health_condition,
                      genders,
                      age_group,
                      url
                    );

                    return editingStudent;
                  } else {
                    return student;
                  }
                });
              });
              resetEditing();
            }}
          >
            <p>Plan Name</p>
            <Input
              name="exe_name"
              value={editingStudent?.plan_name}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, plan_name: e.target.value };
                });
              }}
            />
            <p>Plan Type</p>
            <Select
              placeholder="Select plan type"
              value={editingStudent?.plan_type}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, plan_type: e };
                });
              }}
            >
              <Option value="Build Muscle">Build Muscle</Option>
              <Option value="Get Fit">Get Fit</Option>
              <Option value="Fat Loss">Fat Loss</Option>
              <Option value="Stretching">Stretching</Option>
            </Select>
            <hr />
            <p>Health Condition?</p>
            <Select
              placeholder="Plan for ill people? "
              value={editingStudent?.health_condition}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, health_condition: e };
                });
              }}
            >
              <Option value="No">No</Option>
              <Option value="Yes">Yes</Option>
            </Select>
            <hr />
            <p>Gender</p>
            <Select
              placeholder="Select a option and change input text above"
              value={editingStudent?.genders}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, genders: e };
                });
              }}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
            <hr />
            <p>Age Group</p>
            <Select
              placeholder="Select Age group"
              value={editingStudent?.age_group}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, age_group: e };
                });
              }}
            >
              <Option value="Baby">Baby</Option>
              <Option value="Adult">Adult</Option>
              <Option value="Middle Aged">Middle Aged</Option>
              <Option value="Old">Old</Option>
            </Select>
            <p>Drive URL</p>
            <Input
              value={editingStudent?.url}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, url: e.target.value };
                });
              }}
            />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admins(PlanAdmin);
