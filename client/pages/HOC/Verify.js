import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const Verify = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verified, setverified] = useState(false);
    useEffect(async () => {
      try {
        const rsponse = await fetch("http://localhost:5000/auth/is-verify", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const parseRes = await rsponse.json();
        // replace true with admin
        if (parseRes == true) {
          setverified(true);
        } else {
          setverified(false);
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

export default Verify;
