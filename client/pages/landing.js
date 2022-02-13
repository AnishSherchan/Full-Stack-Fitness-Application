//? Index page or landing page design
import React from "react";
import Image from "next/image";
import Nav from "../src/components/AppHeader/Header.tsx";
import { Button } from "antd";
import Link from "next/link";

const landing = () => {
  return (
    <div className="">
      {/* Navbar for Landing page */}
      <Nav buttons={true} />

      {/* Body of the index page */}
      {/* First div */}
      <div
        className="first h-screen grid grid-cols-2 bg-bgcolor "
        // styles={{ backgroundImage: `url(${Background})` }}
      >
        <div>
          <div className="pt-28 pl-28">
            <Image
              src="/icons/Title1.svg"
              alt="Logo"
              width={411}
              height={229}
            />
          </div>
          <Link href="/Authentication/Register">
            <div className="pt-8 pl-36 hover:drop-shadow-xl ">
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
          <div className="pt-16 ">
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
        className="second h-screen grid grid-cols-2 bg-bgcolor"
        // styles={{ backgroundImage: `url(${Background})` }}
      >
        {/* Using content to invert image */}
        <div className="content">
          <div className="pt-40 pl-10">
            <Image
              src="/icons/Traning.svg"
              alt="Logo"
              width={672}
              height={420}
            />
          </div>
        </div>
        <div className="content pt-52 pl-28">
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
      <div className="bg-gray-900">
        <Image src="/icons/footer.svg" alt="Title" width={1550} height={295} />
      </div>
    </div>
  );
};

export default landing;
