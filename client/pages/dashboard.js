// Todo Complete Dashboard
// Todo Create Save Changes Function
// Todo Create BMI calculate Function
import React, { useState, useEffect } from "react";
import Nav from "../src/components/AppHeader/Header.tsx";
import { Button, Typography, Divider, Radio, Input } from "antd";
import Image from "next/image";
import { toast } from "react-toastify";
import Verify from "./HOC/Verify";
// Check
const dashboard = () => {
  const { Paragraph } = Typography;
  // ? Global Varibale which must be stored in Redux
  const [name, setname] = useState("");
  const [userid, setuserid] = useState("");
  // ?Weight and height detail for users edit
  let h1 = 0;
  let w1 = 0;
  const UserinputHeight = (e) => {
    h1 = e.target.value;
  };
  const UserinputWeight = (e) => {
    w1 = e.target.value;
  };
  // ? Submit event for editing Weight Height of Edit and BMI

  const InputValue = () => {
    if (h1 !== 0 && w1 !== 0) {
      console.log("Value submited");
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
    console.log(e.target.value);
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
        <div className="h-fitcontent md:w-8/12 md:py-5 md:bg-navcolor rounded-3xl drop-shadow-2xl md:mt-11">
          <h1 className="text-2xl mt-5 px-10 text-center ">User Profile</h1>
          <div className="md:flex justify-center  ">
            <div className="py-6 md:flex hidden flex-shrink-0">
              <Image
                className=""
                src="/icons/User.svg"
                alt="Logo"
                width={315}
                height={210}
              />
            </div>
            <div className="py-6 md:py-10 px-10">
              <p className="text-lg text-center md:text-left">Name : {name} </p>
              <p className="text-lg text-center md:text-left">
                Date Of birth : 2001/06/06{" "}
              </p>
              <p className="text-lg text-center md:text-left">Weight : 91kgs</p>
              <p className="text-lg text-center md:text-left">
                Height : 1.78m{" "}
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
                defaultValue={1}
              >
                <Radio value={1}>Lose Weight</Radio>
                <Radio value={2}>Get Toned</Radio>
                <Radio value={3}>Build Muscle</Radio>
              </Radio.Group>
            </div>
            <div>
              <div className="md:flex md:pt-2 items-center ">
                <p className="mt-3 md:pr-4 text-lg">Weight:</p>
                <div>
                  <Input
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
            </div>
            <p className="text-center text-blue-500 cursor-pointer ">
              Erase profile
            </p>
          </div>
        </div>
      </div>
      {
        // ?Second Tag
      }
      <div className="px-5 md:bg-dark pb-6">
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
            <p className="mt-3 text-lg">BMI: 19.41</p>
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
