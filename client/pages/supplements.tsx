import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import Verify from "./HOC/Verify";
import SupInfo from "../src/components/SupplementsInfo";
import Nav from "../src/components/AppHeader/Header";
const supplements = () => {
  const [supplements, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const supplementsInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/supplements",
        {
          method: "get",
        }
      );
      const parseRes = await response.json();
      setCoins(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredsupplement = supplements.filter((supplement) =>
    supplement.supplement_name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    supplementsInfo();
  }, []);
  return (
    <div>
      <Nav buttons={false} verifyContent={true} CurrentPage={4} />
      <div className="p-5">
        <div className=" md:flex md:flex-col md:pb-5 md:items-center">
          <h1 className="md:text-3xl text-center text-2xl heading">
            Supplements
          </h1>
          <div className="md:w-4/12">
            <Input
              size="large"
              style={{
                borderRadius: "10px",
              }}
              allowClear
              placeholder="Search Suppliment"
              onChange={handleChange}
            />
          </div>
        </div>

        {
          // ? Supplements Content
        }
        <div className="flex flex-wrap justify-evenly">
          {filteredsupplement.map((supplement) => {
            return (
              <SupInfo
                key={supplement.supplement_id}
                id={supplement.supplement_id}
                url={supplement.image_url}
                title={supplement.supplement_name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Verify(supplements);
