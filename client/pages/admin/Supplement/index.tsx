import React, { useState, useEffect } from "react";
import Admins from "../../HOC/admin";
import Sidenav from "../../../src/components/Admin_Component/SideNav";
import { Layout, Table, Modal, Input, Select } from "antd";
import Link from "next/link";
const { Option } = Select;
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SupplementsAdmin = () => {
  const { Header, Sider, Content } = Layout;
  const [exercises, setexercises] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const EditExercise = async (
    supplement_id,
    supplement_name,
    company,
    energy,
    protein,
    carbs,
    image_url
  ) => {
    try {
      const body = {
        supplement_id,
        supplement_name,
        company,
        energy,
        protein,
        carbs,
        image_url,
      };
      const response = await fetch("http://localhost:5000/admin/supplement", {
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
      title: "Are you sure, you want to delete this Supplement?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        console.log(record.supplement_name);
        const supplement_id = record.supplement_id;
        try {
          const response = await fetch(
            `http://localhost:5000/admin/supplement/${supplement_id}`,
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
          return pre.filter(
            (exe) => exe.supplement_id !== record.supplement_id
          );
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
      dataIndex: "supplement_id",
      sorter: (a, b) => a.supplement_id - b.supplement_id,
    },
    {
      key: "2",
      title: "Supplement Name",
      dataIndex: "supplement_name",
    },
    {
      key: "3",
      title: "Company Name",
      dataIndex: "company",
    },
    {
      key: "4",
      title: "Energy Per 100g",
      dataIndex: "energy",
    },
    {
      key: "5",
      title: "Protein Per 100g",
      dataIndex: "protein",
    },
    {
      key: "6",
      title: "Carbs Per 100g",
      dataIndex: "carbs",
    },
    {
      key: "7",
      title: "url",
      dataIndex: "image_url",
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
      const response = await fetch(
        "http://localhost:5000/dashboard/supplements",
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
          <h1 className="text-xl text-center p-4">Supplement</h1>
        </Header>
        <Content style={{ backgroundColor: "#e1e5e8" }}>
          <div className="fixed bg-primaryButton p-1 px-4 rounded-xl z-10 bottom-0 right-0 m-3">
            <Link href="/dashboard">
              <a className="text-white">User panel</a>
            </Link>
          </div>
          <div className="md:flex md:flex-col md:items-center ">
            <div className="h-fitcontent p-5 md:w-11/12 md:bg-navcolor rounded-3xl drop-shadow-2xl mb-6 md:mt-11">
              <p className="text-center text-xl">Supplements</p>
              <Table
                title={() => "Edit Supplements"}
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
                  if (student.supplement_id === editingStudent.supplement_id) {
                    let supplement_id = student.supplement_id;
                    let supplement_name = editingStudent.supplement_name;
                    let company = editingStudent.company;
                    let energy = editingStudent.energy;
                    let protein = editingStudent.protein;
                    let carbs = editingStudent.carbs;
                    let image_url = editingStudent.image_url;
                    EditExercise(
                      supplement_id,
                      supplement_name,
                      company,
                      energy,
                      protein,
                      carbs,
                      image_url
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
            <p>Supplement Name</p>
            <Input
              name="exe_name"
              value={editingStudent?.supplement_name}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, supplement_name: e.target.value };
                });
              }}
            />
            <p>Company Name</p>
            <Input
              value={editingStudent?.company}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, company: e.target.value };
                });
              }}
            />
            <p>Energy per 100g</p>
            <Input
              value={editingStudent?.energy}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, energy: e.target.value };
                });
              }}
            />
            <p>Protein per 100g</p>
            <Input
              value={editingStudent?.protein}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, protein: e.target.value };
                });
              }}
            />
            <p>Carbs per 100g</p>
            <Input
              value={editingStudent?.carbs}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, carbs: e.target.value };
                });
              }}
            />
            <p>Image Url</p>
            <Input
              value={editingStudent?.image_url}
              onChange={(e) => {
                setEditingStudent((pre) => {
                  return { ...pre, image_url: e.target.value };
                });
              }}
            />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admins(SupplementsAdmin);
