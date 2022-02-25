// Todo Complete Dashboard
// Todo Create Save Changes Function
// Todo Create BMI calculate Function
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Nav from "../src/components/AppHeader/Header.tsx";
import { Button, Typography, Popover, Divider, Radio, Input } from "antd";
import Image from "next/image";
import { toast } from "react-toastify";
import Verify from "./HOC/Verify";
const dashboard = () => {
  const router = useRouter();
  const { Paragraph } = Typography;
  // ? Global Varibale which must be stored in Redux
  const [name, setname] = useState("");
  const [userid, setuserid] = useState("");
  const [goal, setusergoal] = useState("");
  const [dob, setdob] = useState("");
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
  const [BMI, setBMI] = useState("");
  // ?Weight and height detail for users edit
  let h1 = 0;
  let w1 = 0;

  // ? popover content
  const content = (
    <div>
      {BMI <= 18.5 && (
        <p>Underweight, we suggest you to start Muscle building program</p>
      )}
      {BMI <= 24.9 && BMI > 18.5 && <p>Normal Weight, Perfect!</p>}
      {BMI < 29.9 && BMI > 25 && (
        <p>Overweight, Slightly overweight start loosing weight</p>
      )}
      {BMI > 30 && (
        <p>Obesity, we suggest you to start fat loss program ASAP!</p>
      )}
    </div>
  );

  const UserinputHeight = (e) => {
    h1 = e.target.value;
  };
  const UserinputWeight = (e) => {
    w1 = e.target.value;
  };
  // ? Submit event for editing Weight Height of Edit and BMI

  // ? Ipnut value for Edit profile
  // Todo use same func fro Calulating BMI
  const InputValue = async () => {
    if (h1 !== 0 && w1 !== 0) {
      let selectedHeight = h1;
      let selectedWeight = w1;
      console.log("Value submited", selectedHeight, " ", selectedWeight);

      try {
        const body = { selectedHeight, selectedWeight };
        const response = await fetch(
          "http://localhost:5000/dashboard/userheightweight",
          {
            method: "PUT",
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

      plana.value = "";
      planb.value = "";
      h1 = 0;
      w1 = 0;
    } else
      toast.error("All Filed must be field", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
  };

  const bmi = async () => {
    if (h1 !== 0 && w1 !== 0) {
      let BMIHeight = h1.substring(0, 1) + "." + h1.substring(1, 3);
      let HeightSq = BMIHeight * BMIHeight;
      let userBMI = w1 / HeightSq;
      setBMI(userBMI.toFixed(1));
      planc.value = "";
      pland.value = "";
      h1 = 0;
      w1 = 0;
    } else
      toast.error("All Filed must be field", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
  };

  const onChange = (e) => {
    setusergoal(e.target.value);
    userGoal(e.target.value);
  };

  // ? User Goal post method
  const userGoal = async (selectedgoal) => {
    try {
      const body = { selectedgoal };
      const response = await fetch("http://localhost:5000/dashboard/usergoal", {
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

  const eraseProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/eraseuser", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
      });
      const parseRes = await response.json();
      localStorage.removeItem("token");
      router.push("/");
      toast.success("Account Deactivated Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/userinfo", {
        method: "get",
        headers: {
          token: localStorage.token,
        },
      });
      const parseRes = await response.json();
      if (parseRes == 0) {
        router.push("/Authentication/Register/info");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // ! user health delete
  const RemoveHealth = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/userhealth",
        {
          method: "delete",
          headers: {
            token: localStorage.token,
          },
        }
      );
      const parseRes = await response.json();
      console.log(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };

  // ! For user information retrive
  const getUserInformation = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/userinformation",
        {
          method: "get",
          headers: {
            token: localStorage.token,
          },
        }
      );
      const parseRes = await response.json();
      setdob(parseRes.dob.slice(0, 10));
      setheight(parseRes.height);
      setweight(parseRes.weight);
      setusergoal(parseRes.goal);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "get",
        headers: {
          token: localStorage.token,
        },
      });
      const parseRes = await response.json();
      setname(parseRes.user_name);
      setuserid(parseRes.user_id);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUserInfo();
    getUserInformation();
    getUser();
  }, []);
  return (
    <div>
      <Nav buttons={false} verifyContent={true} CurrentPage={1} />
      <h1 className="text-2xl mt-5 px-10 heading ">Hello {name} 👋</h1>
      {
        // ? First Tag
      }
      <div className="md:flex md:flex-col md:pb-5 md:items-center">
        <div className="h-fitcontent md:w-8/12 md:py-3 py-2 bg-navcolor rounded-3xl drop-shadow-2xl md:mt-11">
          <h1 className="text-2xl mt-5 px-10 text-center ">User Profile</h1>
          <div className="md:flex justify-center  ">
            <div className="py-6 md:flex hidden flex-shrink-0">
              <Image
                src="/icons/User.svg"
                alt="Logo"
                width={315}
                height={210}
              />
            </div>
            <div className="py-6 md:py-10 px-10">
              <p className="text-lg text-center md:text-left">Name : {name} </p>
              <p className="text-lg text-center md:text-left">
                Date Of birth : {dob}
              </p>
              <p className="text-lg text-center md:text-left">
                Weight : {weight} kgs
              </p>
              <p className="text-lg text-center md:text-left">
                Height : {height} cm
              </p>
              <p className="hidden md:flex md:text-lg md:text-left">
                User id :
                <Paragraph style={{ fontSize: "15px" }} copyable>
                  {userid}
                </Paragraph>
              </p>
            </div>
          </div>
          <Divider className="border-solid">
            <span className="text-base leading-6 opacity-70 font-roboto">
              Edit Profile
            </span>
          </Divider>
          <div className="px-12">
            <div>
              <h1 className="text-xl">Change your plan </h1>
              <Radio.Group
                name="radiogroup"
                onChange={onChange}
                defaultValue={goal}
              >
                <Radio value={"Fat Loss"}>Lose Weight</Radio>
                <Radio value={"Get Fit"}>Get Fit</Radio>
                <Radio value={"Build Muscle"}>Build Muscle</Radio>
              </Radio.Group>
            </div>
            <div>
              <div className="md:flex md:pt-2 items-center ">
                <p className="mt-3 md:pr-4 text-lg">Weight:</p>
                <div>
                  <Input
                    id="plana"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => UserinputWeight(e)}
                    style={{
                      borderRadius: "10px",
                    }}
                    allowClear
                    placeholder="Weight/KGS"
                  />
                </div>
                <p className="mt-3 md:px-4 text-lg">Height:</p>
                <div>
                  <Input
                    id="planb"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => UserinputHeight(e)}
                    style={{
                      borderRadius: "10px",
                    }}
                    allowClear
                    placeholder="Height/m"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className=" pt-2 hover:drop-shadow-xl ">
                <Button
                  style={{
                    backgroundColor: "#607fe8",
                    borderRadius: "10px",
                    height: "45px",
                    width: "138px",
                    boxShadow: "1px 1px grey",
                    border: "none",
                  }}
                  onClick={InputValue}
                >
                  <p className="text-lg pt-1 text-white">Save Changes</p>
                </Button>
              </div>
              <div className=" pt-2 md:pl-3 hover:drop-shadow-xl ">
                <Button
                  style={{
                    backgroundColor: "#607fe8",
                    borderRadius: "10px",
                    height: "45px",
                    width: "230px",
                    boxShadow: "1px 1px grey",
                    border: "none",
                  }}
                  onClick={RemoveHealth}
                >
                  <p className="text-lg pt-1 text-white">
                    Remove Health Condition
                  </p>
                </Button>
              </div>
              <div className=" pt-2 md:px-3 hover:drop-shadow-xl ">
                <Button
                  style={{
                    backgroundColor: "#607fe8",
                    borderRadius: "10px",
                    height: "45px",
                    width: "250px",
                    boxShadow: "1px 1px grey",
                    border: "none",
                  }}
                  onClick={InputValue}
                >
                  <p className="text-lg pt-1 text-white">
                    Edit your Health Condition
                  </p>
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap pt-3 flex-col">
              <a className="text-center  cursor-pointer" onClick={eraseProfile}>
                Erase profile
              </a>
            </div>
          </div>
        </div>
      </div>
      {
        // ?Second Tag
      }
      <div className="px-5 py-3 md:bg-dark pb-6">
        <h1 className="text-2xl md:pt-6 md:text-white px-10 text-center ">
          Body Metric
        </h1>
        <div className="hidden md:flex md:flex-col md:items-center">
          <Image width={569} height={472} src="/icons/graph.svg" />
        </div>
        <div className="md:flex md:flex-col md:items-center">
          <div className=" h-fitcontent md:w-8/12 px-9 md:pb-6 md:bg-navcolor rounded-3xl drop-shadow-2xl md:mt-11">
            <h1 className="text-xl mt-5 px-1 ">Calculate BMI</h1>
            <div className="md:flex md:pt-2 items-center ">
              <p className="mt-3 md:pr-4 text-lg">Weight:</p>
              <div>
                <Input
                  id="planc"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => UserinputWeight(e)}
                  allowClear
                  style={{
                    borderRadius: "10px",
                  }}
                  placeholder="Weight/KGS"
                />
              </div>
              <p className="mt-3 md:px-4 text-lg">Height:</p>
              <div>
                <Input
                  id="pland"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => UserinputHeight(e)}
                  allowClear
                  style={{
                    borderRadius: "10px",
                  }}
                  placeholder="Height/m"
                />
              </div>
            </div>
            <p className="mt-3 text-lg">
              BMI: {BMI}
              <Popover content={content} title="BMI Information">
                <Button type="primary">Tips</Button>
              </Popover>
            </p>

            <div className="flex flex-wrap justify-evenly">
              <div className=" pt-2 hover:drop-shadow-xl ">
                <Button
                  style={{
                    backgroundColor: "#607fe8",
                    borderRadius: "10px",
                    height: "50px",
                    width: "135px",
                    boxShadow: "1px 1px grey",
                    border: "none",
                  }}
                >
                  <p className="text-lg pt-1 text-white">Measurement</p>
                </Button>
              </div>
              <div className="pt-2 hover:drop-shadow-xl ">
                <Button
                  style={{
                    backgroundColor: "#607fe8",
                    borderRadius: "10px",
                    height: "50px",
                    width: "135px",
                    boxShadow: "1px 1px grey",
                    border: "none",
                  }}
                  onClick={bmi}
                >
                  <p className="text-lg pt-1 text-white">Calculate BMI</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify(dashboard);
