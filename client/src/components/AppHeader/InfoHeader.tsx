import React from "react";
import Link from "next/link";

interface Props {
  title: string;
}
const InfoHeader = ({ title }) => {
  return (
    <div>
      {" "}
      <div className="h-24 w-screen justify-center flex flex-col text-center heading text-2xl bg-navcolor">
        {title}
      </div>
    </div>
  );
};

export default InfoHeader;
