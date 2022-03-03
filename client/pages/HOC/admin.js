import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const admin = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verified, setverified] = useState(false);
    useEffect(async () => {
      try {
        const rsponse = await fetch("http://localhost:5000/auth/admin", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const parseRes = await rsponse.json();
        console.log(parseRes);
        // replace true with admin
        if (parseRes == "admin") {
          setverified(true);
        } else {
          setverified(false);
        }
        if (parseRes == "user") {
          localStorage.removeItem("token");
          router.push("/");
        }
        if (parseRes == "Not Authorize") {
          localStorage.removeItem("token");
          router.push("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    }, []);

    if (verified == true) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default admin;
