import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import Nav from "../src/components/AppHeader/Header";
const notfound = () => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setVerified(true);
    }
  }, []);
  return (
    <div className="h-screen bg-white md:bg-bgcolor">
      <Nav buttons={!verified} verifyContent={verified} CurrentPage={0} />
      <div className="flex h-5/6 flex-col items-center justify-center">
        <div className="flex flex-col p-8 rounded-xl items-center md:bg-white w-fit">
          <Image
            src="/icons/404Page.svg"
            alt="Title"
            width={511}
            height={429}
          />

          {verified == false && (
            <Link href="/">
              <Button
                style={{
                  backgroundColor: "#607fe8",
                  borderRadius: "10px",
                  height: "50px",
                  width: "195px",
                  boxShadow: "1px 1px #9A9A9A",
                  border: "none",
                }}
              >
                <p className="text-lg pt-1 text-white">Go Back</p>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default notfound;
