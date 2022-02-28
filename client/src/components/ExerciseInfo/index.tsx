import React from "react";
import { Button } from "antd";
import Link from "next/link";
interface Props {
  key: string;
  id: number;
  muscle: string;
  title: string;
  type: string;
}
const index: React.FC<Props> = ({ muscle, type, title, id }) => {
  return (
    <div className="md:px-32">
      <div className="flex rounded-3xl mt-9 drop-shadow-2xl flex-wrap h-20 md:h-32  items-center justify-evenly bg-dark">
        <p className="text-white md:text-lg ">{title}</p>
        <p className="text-white md:text-lg">Target Area: {muscle}</p>
        <p className="hidden md:block text-white md:text-lg">Type: {type}</p>
        <Link href="/exercise/info">
          <Button
            size="middle"
            style={{
              backgroundColor: "#607fe8",
              borderRadius: "10px",
              boxShadow: "1px 1px grey",
              color: "white",
              border: "none",
            }}
            onClick={() => {
              console.log(id);
            }}
          >
            Learn more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default index;
