import React, { useEffect } from "react";
import { useRouter } from "next/router";
const admin = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const notVerified = false;
    useEffect(async () => {
      try {
        const rsponse = await fetch("http://localhost:5000/auth/admin", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const parseRes = await rsponse.json();
        // replace true with admin
        if (parseRes == "admin") {
          notVerified = true;
        } else {
          notVerified = false;
        }
        if (notVerified == false) {
          localStorage.removeItem("token");
          router.push("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    }, []);

    if (notVerified === true) {
      return null;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default admin;
