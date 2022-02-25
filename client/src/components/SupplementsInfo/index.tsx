import React from "react";
import Image from "next/image";
interface Props {
  key: string;
  id: number;
  url: string;
  title: string;
}
const index: React.FC<Props> = ({ url, title, id }) => {
  return (
    <div>
      <div className="flex mt-5 rounded-3xl drop-shadow-2xl flex-col h-96 w-80 md:h-96 md:w-96 align-middle  bg-white">
        <div className="flex my-3  justify-center">
          <img
            className="rounded-xl"
            src={url}
            height="300px"
            width="300px"
          ></img>
        </div>
        <p className="text-black text-lg md:text-lg text-center">
          {title}{" "}
          <a
            onClick={() => {
              console.log(id);
            }}
          >
            Get Info
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default index;
