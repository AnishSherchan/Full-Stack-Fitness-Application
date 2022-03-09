import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Chartsdata from "../src/components/Charts";
import Nav from "../src/components/AppHeader/Header.tsx";
import {
  Button,
  Modal,
  Select,
  Typography,
  Popover,
  Divider,
  Radio,
  Form,
  Input,
  Carousel,
} from "antd";
import Image from "next/image";
import { toast } from "react-toastify";
import Verify from "./HOC/Verify";

const dashboard = () => {
  const contentStyle = {
    height: "260px",
    color: "#fff",
    lineHeight: "260px",
    textAlign: "center",
  };
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
  const [adminrole, setrole] = useState(false);
  const Arraycondition = [];
  let condition;
  // ?Weight and height detail for users edit
  let h1 = 0;
  let w1 = 0;
  let neck = 0;
  let shoulder = 0;
  let forearm = 0;
  let biceps = 0;
  let hip = 0;
  let thigh = 0;
  let claves = 0;
  // ? Modal

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [ModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showMeasureModal = () => {
    setModalVisible(true);
  };

  const userhealth = async () => {
    try {
      const body = { condition };
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinish = async () => {
    try {
      const body = { neck, shoulder, forearm, biceps, hip, thigh, claves };
      const response = await fetch(
        "http://localhost:5000/dashboard/userbodymetric",
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
      onReset();
    } catch (error) {
      console.log(error.message);
    }
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const eraseuserhealth = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/userhealth",
        {
          method: "DELETE",
          headers: {
            token: localStorage.token,
            "Content-type": "application/json",
          },
        }
      );
      const parseRes = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOk = async () => {
    if (Arraycondition.length != 0) {
      eraseuserhealth();
      let User_condition = [...Arraycondition[Arraycondition.length - 1]];
      for (let i = 0; i < User_condition.length; i++) {
        condition = User_condition[i];
        userhealth();
      }
    }
    setIsModalVisible(false);
  };

  const handleMeasureOk = async () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMeasureCancel = () => {
    setModalVisible(false);
  };

  function handleChange(value) {
    Arraycondition.push(value);
  }

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
  const userinputneck = (e) => {
    neck = e.target.value;
  };
  const userinputshoulder = (e) => {
    shoulder = e.target.value;
  };
  const userinputforearm = (e) => {
    forearm = e.target.value;
  };
  const userinputbiceps = (e) => {
    biceps = e.target.value;
  };
  const userinputhip = (e) => {
    hip = e.target.value;
  };
  const userinputthigh = (e) => {
    thigh = e.target.value;
  };
  const userinputclaves = (e) => {
    claves = e.target.value;
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
      setweight(w1);
      setheight(h1);

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
      console.log(parseRes);
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
      if (parseRes.user_role == "admin") {
        setrole(true);
      }
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
      {adminrole == true && (
        <div className="fixed bg-primaryButton p-1 px-4 rounded-xl z-10 bottom-0 right-0 m-3">
          <Link href="/admin">
            <a className="text-white">Admin pannel</a>
          </Link>
        </div>
      )}
      {
        // ? First Tag
      }

      <Carousel autoplay effect="fade">
        <div>
          <h3
            className="md:text-3xl bg-fixed bg-no-repeat bg-cover bg-top bg-[url('https://wallpaperaccess.com/full/2079529.jpg')] text-md  tracking-widest"
            style={contentStyle}
          >
            ❝ DON'T WISH FOR IT, WORK FOR IT ❞
          </h3>
        </div>
        <div>
          <h3
            className="md:text-3xl bg-fixed bg-no-repeat bg-cover bg-top  bg-[url('https://www.matchroomboxing.com/app/themes/matchroom/dist/images/preloader-24_2672c309.jpg')] text-md  tracking-widest"
            style={contentStyle}
          >
            ❝ TRAIN INSANE OR REMAIN THE SAME ❞
          </h3>
        </div>
        <div>
          <h3
            className="md:text-3xl grayscale text-md bg-fixed bg-no-repeat bg-cover bg-center bg-[url('https://library.sportingnews.com/2021-08/khabib-nurmagomedov-cropped_1ldlgbf0wyd3u1eauhuzzkt3yp.jpg')]  tracking-widest"
            style={contentStyle}
          >
            ❝ GO HARD or GO HOME ❞
          </h3>
        </div>
        <div>
          <h3
            className="md:text-3xl grayscale  text-md bg-fixed bg-no-repeat bg-cover bg-[url('https://i.guim.co.uk/img/media/1914975a01a04898b32a2da113f4ab581399f776/0_32_2602_1562/master/2602..jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=623b14a9df8c9f77148024b0b71c9c99')] bg-top  tracking-widest"
            style={contentStyle}
          >
            ❝ TRUST YOURSELF AND CONQUER ❞
          </h3>
        </div>
      </Carousel>

      <h1 className="text-2xl mt-5 mb-0 px-4 text-center heading ">
        Hello {name} 👋
      </h1>

      <div className="mb-0">
        <h1 className="text-3xl tracking-widest  text-gray-600 text-center mb-0 py-4 px-4 heading ">
          ❛ Welcome to{" "}
          <span className="font-semibold text-primaryButton">
            GUARDIAN FITNESS{" "}
          </span>
          ❜
        </h1>
      </div>
      <div className="md:flex md:flex-col md:pb-5 md:items-center">
        <div className="h-fitcontent md:w-8/12 md:py-3 py-2 bg-navcolor rounded-3xl drop-shadow-2xl md:mt-11">
          <h1 className="text-2xl mt-5 px-10 text-center ">User Profile</h1>
          <div className="md:flex justify-center  ">
            <div className="py-6 tablet:flex hidden flex-shrink-0">
              <Image
                src="/icons/User.svg"
                alt="Logo"
                width={315}
                height={210}
              />
            </div>
            <div className="py-6 md:py-10 px-10">
              <p className="text-lg items-center flex text-center md:text-left">
                <img
                  className="px-4"
                  style={{ height: "30px" }}
                  src="https://cdn-icons-png.flaticon.com/512/1759/1759311.png"
                ></img>
                Name : {name}{" "}
              </p>
              <p className="text-lg items-center flex text-center md:text-left">
                <img
                  className="px-4"
                  style={{ height: "30px" }}
                  src="https://cdn-icons-png.flaticon.com/512/6938/6938604.png"
                ></img>
                Date Of birth : {dob} &nbsp; <a>Edit</a>
              </p>
              <p className=" items-center flex text-lg text-center md:text-left">
                <img
                  className="px-4"
                  style={{ height: "30px" }}
                  src="https://cdn-icons.flaticon.com/png/128/3746/premium/3746552.png?token=exp=1646651311~hmac=022cda9eb744ac2545aaaed68df57b52"
                ></img>{" "}
                Weight : {weight} kgs
              </p>
              <p className="items-center flex text-lg text-center md:text-left">
                <img
                  className="px-4"
                  style={{ height: "30px" }}
                  src="https://cdn-icons-png.flaticon.com/512/5559/5559879.png"
                ></img>{" "}
                Height : {height} cm
              </p>
              <p className="items-center flex text-lg text-center md:text-left">
                <img
                  className="px-4"
                  style={{ height: "30px" }}
                  src="https://cdn-icons.flaticon.com/png/512/3131/premium/3131619.png?token=exp=1646652052~hmac=f88c88b1c84bc9969de1af48de746c2f"
                ></img>{" "}
                Your Notes &nbsp; <a> Check</a>
              </p>
              <p className="hidden items-center  md:flex md:text-lg md:text-left">
                <img
                  className="px-4"
                  style={{ height: "30px" }}
                  src="https://cdn-icons-png.flaticon.com/512/752/752687.png"
                ></img>{" "}
                User id :
                <Paragraph
                  style={{ fontSize: "15px", paddingTop: "13px" }}
                  copyable
                >
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
              <Modal
                bodyStyle={{ height: "400px" }}
                title="Select Health Condition"
                width={600}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p className="text-pink-900 text-xl">
                  Please reselect all your health Conditions!
                </p>
                <p className="text-sky-600">
                  If your health condition is not listed below please consult
                  your tainer or doctor!
                </p>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  onChange={handleChange}
                >
                  {children}
                </Select>
              </Modal>
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
                  onClick={showModal}
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
      <div className="px-5 py-3 pb-6 bg-fixed bg-no-repeat bg-cover bg-top tablet:bg-[url('https://wallpaperaccess.com/full/2079529.jpg')]">
        <h1 className="text-3xl drop-shadow-2xl md:pt-6 tablet:text-white px-10 text-center ">
          Body Metric
        </h1>
        <div className="md:flex md:flex-col md:items-center">
          <Chartsdata />
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
            <Modal
              bodyStyle={{ height: "800px" }}
              title="Body Measurements"
              width={1000}
              visible={ModalVisible}
              onOk={handleMeasureOk}
              onCancel={handleMeasureCancel}
            >
              <p className="text-pink-900 text-lg">
                Please measure all muscles given below! Measure in inch
              </p>
              <Form
                name="normal_login"
                className="login-form"
                layout="vertical"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Neck size in inch."
                  name="Neck"
                  rules={[
                    { required: true, message: "Please enter your Neck Size!" },
                  ]}
                >
                  <Input
                    id="FormValues"
                    onKeyPress={(event) => {
                      if (!/[0-9-.]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => userinputneck(e)}
                    size="middle "
                    style={{
                      borderRadius: "10px",
                      fontSize: "17px",
                    }}
                    placeholder="Weight/KGS"
                  />
                </Form.Item>

                <Form.Item
                  label="Shoulder size in inch."
                  name="shoulder"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Shoulder size!",
                    },
                  ]}
                >
                  <Input
                    id="FormValues"
                    onKeyPress={(event) => {
                      if (!/[0-9-.]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => userinputshoulder(e)}
                    size="middle "
                    style={{
                      borderRadius: "10px",
                      fontSize: "17px",
                    }}
                    placeholder="Height/m"
                  />
                </Form.Item>
                <Form.Item
                  label="forearm size in inch."
                  name="forearm"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your forearm size!",
                    },
                  ]}
                >
                  <Input
                    id="FormValues"
                    onKeyPress={(event) => {
                      if (!/[0-9-.]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => userinputforearm(e)}
                    size="middle "
                    style={{
                      borderRadius: "10px",
                      fontSize: "17px",
                    }}
                    placeholder="Height/m"
                  />
                </Form.Item>
                <Form.Item
                  label="Biceps size in inch."
                  name="biceps"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your biceps size!",
                    },
                  ]}
                >
                  <Input
                    id="FormValues"
                    onKeyPress={(event) => {
                      if (!/[0-9-.]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => userinputbiceps(e)}
                    size="middle "
                    style={{
                      borderRadius: "10px",
                      fontSize: "17px",
                    }}
                    placeholder="Height/m"
                  />
                </Form.Item>
                <Form.Item
                  label="Hip size in inch."
                  name="hip"
                  rules={[
                    { required: true, message: "Please enter your hip size!" },
                  ]}
                >
                  <Input
                    id="FormValues"
                    onKeyPress={(event) => {
                      if (!/[0-9-.]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => userinputhip(e)}
                    size="middle "
                    style={{
                      borderRadius: "10px",
                      fontSize: "17px",
                    }}
                    placeholder="Height/m"
                  />
                </Form.Item>
                <Form.Item
                  label="Thigh size in inch."
                  name="thigh"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your thigh size!",
                    },
                  ]}
                >
                  <Input
                    id="FormValues"
                    onKeyPress={(event) => {
                      if (!/[0-9-.-.]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => userinputthigh(e)}
                    size="middle "
                    style={{
                      borderRadius: "10px",
                      fontSize: "17px",
                    }}
                    placeholder="Height/m"
                  />
                </Form.Item>
                <Form.Item
                  label="Claves size in inch."
                  name="claves"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Claves size!",
                    },
                  ]}
                >
                  <Input
                    id="FormValues"
                    onKeyPress={(event) => {
                      if (!/[0-9-.]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => userinputclaves(e)}
                    size="middle "
                    style={{
                      borderRadius: "10px",
                      fontSize: "17px",
                    }}
                    placeholder="Height/m"
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
                    Save Progress
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
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
                  onClick={showMeasureModal}
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
