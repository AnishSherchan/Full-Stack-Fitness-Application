import React, { useState, useEffect } from "react";
import Admins from "../../HOC/admin";
import Sidenav from "../../../src/components/Admin_Component/SideNav";
import { Layout, Table, Modal, Input } from "antd";
import Link from "next/link";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const ExerciseAdmin = () => {
  const { Header, Sider, Content } = Layout;
  const [exercises, setexercises] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // ! Here editing Student simply means editing exercise
  const [editingStudent, setEditingStudent] = useState(null);

  const EditExercise = async (
    ex_id,
    exercise_name,
    target_muscle,
    equipment_required,
    url
  ) => {
    try {
      const body = {
        ex_id,
        exercise_name,
        target_muscle,
        equipment_required,
        url,
      };
      const response = await fetch("http://localhost:5000/admin/exercise", {
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
  // ! Here Student simply means Exercise
  const onDeleteStudent = async (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Exercise?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        console.log(record.exercise_name);
        const ex_id = record.ex_id;
        try {
          const response = await fetch(
            `http://localhost:5000/admin/exercise/${ex_id}`,
            {
              method: "DELETE",
            }
          );

          const parseRes = await response.json();
          console.log(parseRes);
          toast.success("Exercise Deleted", {
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
          return pre.filter((exe) => exe.ex_id !== record.ex_id);
        });
      },
    });
  };
  // ! Here Student simply means Exercise
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
      dataIndex: "ex_id",
      sorter: (a, b) => a.ex_id - b.ex_id,
    },
    {
      key: "2",
      title: "Exercise Name",
      dataIndex: "exercise_name",
    },
    {
      key: "3",
      title: "Target Muscle",
      dataIndex: "target_muscle",
    },
    {
      key: "4",
      title: "Equipment Required",
      dataIndex: "equipment_required",
    },

    {
      key: "5",
      title: "Youtube Url",
      dataIndex: "url",
    },
    {
      key: "6",
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
      const response = await fetch(
        "http://localhost:5000/dashboard/exercises",
        {
          method: "get",
        }
      );
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
          <h1 className="text-xl text-center p-4">Exercises</h1>
        </Header>
        <Content>
          <div className="bg-white laptop:bg-transparent">
            <div className="fixed bg-primaryButton p-1 px-4 rounded-xl z-10 bottom-0 right-0 m-3">
              <Link href="/dashboard">
                <a className="text-white">User panel</a>
              </Link>
            </div>
            <div className="md:flex md:flex-col overflow-scroll md:items-center ">
              <div className="h-fitcontent p-5 w-full  md:w-11/12 laptop:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
                <p className="text-center text-xl">Exercise</p>
                <div className="w-fit">
                  <Table
                    title={() => "Edit Exercise"}
                    bordered
                    columns={columns}
                    dataSource={exercises}
                  />
                </div>
              </div>
            </div>
          </div>

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
                  if (student.ex_id === editingStudent.ex_id) {
                    let ex_id = student.ex_id;
                    let exercise_name = editingStudent.exercise_name;
                    let target_muscle = editingStudent.target_muscle;
                    let equipment_required = editingStudent.equipment_required;
                    let url = editingStudent.url;
                    EditExercise(
                      ex_id,
                      exercise_name,
                      target_muscle,
                      equipment_required,
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
            <p>Exercise Name</p>
            <Input
              name="exe_name"
              value={editingStudent?.exercise_name}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, exercise_name: e.target.value };
                });
              }}
            />
            <p>Target Muscle</p>
            <Input
              value={editingStudent?.target_muscle}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, target_muscle: e.target.value };
                });
              }}
            />
            <p>Equipment Required</p>
            <Input
              value={editingStudent?.equipment_required}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, equipment_required: e.target.value };
                });
              }}
            />
            <p>Youtube URL </p>
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

export default Admins(ExerciseAdmin);
