//? Index page or landing page design
import React from "react";
import Image from "next/image";
import Nav from "../src/components/AppHeader/Header.tsx";
import { Button, Carousel } from "antd";
import Link from "next/link";

const landing = () => {
  const contentStyle = {
    height: "250px",
    color: "#fff",
    lineHeight: "250px",
    textAlign: "center",
  };
  return (
    <div className="contmain">
      {/* Navbar for Landing page */}
      <Nav buttons={true} verifyContent={false} CurrentPage={0} />
      <Carousel autoplay effect="fade">
        <div>
          <h3
            className="md:text-3xl  font-bold  bg-fixed bg-no-repeat bg-cover bg-top bg-[url('https://wallpaperaccess.com/full/1097428.jpg')] text-md  tracking-widest"
            style={contentStyle}
          >
            ❝ WELCOME TO GUARDIAN FITNESS ❞
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
            className="md:text-3xl grayscale  text-md bg-fixed bg-no-repeat bg-cover bg-[url('https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2016%2F1122%2Fr154934_1296x729_16%2D9.jpg')] bg-center  tracking-widest"
            style={contentStyle}
          >
            ❝ TRUST YOURSELF AND CONQUER ❞
          </h3>
        </div>
        <div>
          <h3
            className="md:text-3xl text-md bg-fixed bg-no-repeat bg-cover bg-top bg-[url('https://www.cleveland.com/resizer/n_t4A3IGcZibGgMyhjF2-tzHV70=/1280x0/smart/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/HJN5GBYAN5DXTBF7PSU3P4CW7Q.jpg')]  tracking-widest"
            style={contentStyle}
          >
            ❝ GO HARD or GO HOME ❞
          </h3>
        </div>
      </Carousel>
      {/* Body of the index page */}
      {/* First div */}
      <div
        className="first grid md:grid-cols-2 "
        // styles={{ backgroundImage: `url(${Background})` }}
      >
        <div>
          <div className="landingcont pt-28 pl-28">
            <Image
              src="/icons/Title1.svg"
              alt="Logo"
              width={411}
              height={229}
            />
          </div>
          <Link href="/Authentication/Register">
            <div className=" pt-8 pl-36 hover:drop-shadow-xl ">
              <Button
                style={{
                  backgroundColor: "#607fe8",
                  borderRadius: "10px",
                  height: "50px",
                  width: "135px",
                  boxShadow: "4px 4px grey",
                  border: "none",
                }}
              >
                <p className="text-lg pt-1 text-white">JOIN NOW !</p>
              </Button>
            </div>
          </Link>
        </div>
        <h1>
          <div className="landingImg pt-16 ">
            <Image
              src="/icons/Trainer.svg"
              alt="Logo"
              width={629}
              height={401}
            />
          </div>
        </h1>
      </div>
      {/* Background image inverted */}
      {/* Second div for page */}
      <div
        className="second grid md:grid-cols-2"
        // styles={{ backgroundImage: `url(${Background})` }}
      >
        {/* Using content to invert image */}
        <div className="content">
          <div className=" landingImg pt-40 pl-10">
            <Image
              src="/icons/Traning.svg"
              alt="Logo"
              width={672}
              height={420}
            />
          </div>
        </div>
        <div className="landingcont content pt-52 pl-28">
          <div>
            <Image
              src="/icons/Title2.svg"
              alt="Title"
              width={411}
              height={229}
            />
          </div>
          <div className="pt-8 pl-6 ">
            <Link href="/Authentication/Register">
              <Button
                style={{
                  backgroundColor: "#607fe8",
                  borderRadius: "10px",
                  height: "50px",
                  width: "195px",
                  boxShadow: "4px 4px #9A9A9A",
                  border: "none",
                }}
              >
                <p className="text-lg pt-1 text-white">TRY IT FOR FREE</p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-gray-900 ">
        <Image src="/icons/footer.svg" alt="Title" width={1550} height={295} />
      </div>
    </div>
  );
};

export default landing;
