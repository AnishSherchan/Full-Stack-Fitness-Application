import React, { useState, useEffect } from "react";
import Admins from "../HOC/admin";
import { Layout } from "antd";
import Sidenav from "../../src/components/Admin_Component/SideNav";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Link from "next/link";
const admindashboard = () => {
  const { Header, Sider, Content } = Layout;
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [users, setUser] = useState(0);
  const [plan, setPlan] = useState(0);
  const [supplement, setSupplement] = useState(0);
  const [exercise, setExercise] = useState(0);
  const data = {
    labels: ["Users", "Plans", "Supplements", "Exercise"],
    datasets: [
      {
        label: "# of Votes",
        data: [users, plan, supplement, exercise],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/users", {
        method: "get",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      });
      const parseRes = await response.json();
      setUser(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getPlan = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/plan", {
        method: "get",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      });
      const parseRes = await response.json();
      setPlan(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getSupplement = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/supplement", {
        method: "get",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      });
      const parseRes = await response.json();
      setSupplement(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getExercise = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/exercise", {
        method: "get",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      });
      const parseRes = await response.json();
      setExercise(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUsers();
    getPlan();
    getSupplement();
    getExercise();
  }, []);
  return (
    <div>
      <Layout>
        <Sider>
          {/* Navigation bar for admin */}
          <Sidenav />
        </Sider>
        <Layout>
          <div className="fixed bg-primaryButton p-1 px-4 rounded-xl z-10 bottom-0 right-0 m-3">
            <Link href="/dashboard">
              <a className="text-white">User panel</a>
            </Link>
          </div>
          <div className="z-10 sticky top-0 left-0 right-0 mb-5">
            <Header style={{ backgroundColor: "#F3F6F7" }}>
              <h1 className="text-xl text-center p-4">Admin Dashboard</h1>
            </Header>
          </div>
          <Content style={{ backgroundColor: "#e1e5e8" }}>
            <div className="flex flex-col justify-items-center items-center  ">
              <div className="rounded-3xl drop-shadow-2xl w-10/12 mt-5 pb-6  bg-adminDash">
                <div className="flex flex-wrap justify-evenly ">
                  <div className="flex mt-5 rounded-3xl drop-shadow-2xl flex-col w-80  md:w-96 align-middle  bg-white">
                    <h1 className="text-black text-xl p-3 md:text-lg text-center">
                      Total number of Users
                    </h1>
                    <h1 className="text-sky-600 text-xl p-3 md:text-2xl text-center">
                      {users}
                    </h1>
                  </div>
                  <div className="flex mt-5 rounded-3xl drop-shadow-2xl flex-col w-80  md:w-96 align-middle  bg-white">
                    <h1 className="text-black text-xl p-3 md:text-lg text-center">
                      Total number of Workout Plans
                    </h1>
                    <h1 className="text-sky-600 text-xl p-3 md:text-2xl text-center">
                      {plan}
                    </h1>
                  </div>
                  <div className="flex mt-5 rounded-3xl drop-shadow-2xl flex-col w-80  md:w-96 align-middle  bg-white">
                    <h1 className="text-black text-xl p-3 md:text-lg text-center">
                      Total number of Supplements
                    </h1>
                    <h1 className="text-sky-600 text-xl p-3 md:text-2xl text-center">
                      {supplement}
                    </h1>
                  </div>
                  <div className="flex mt-5 rounded-3xl drop-shadow-2xl flex-col w-80  md:w-96 align-middle  bg-white">
                    <h1 className="text-black text-xl p-3 md:text-lg text-center">
                      Total number of Exercises
                    </h1>
                    <h1 className="text-sky-600  text-xl p-3 md:text-2xl text-center">
                      {exercise}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex m-5 justify-center ">
              <div className="flex mt-5 rounded-3xl drop-shadow-2xl px-7 py-4 flex-col align-middle  bg-white">
                <Doughnut data={data} />
              </div>
              <div className="h-5/6"></div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admins(admindashboard);
