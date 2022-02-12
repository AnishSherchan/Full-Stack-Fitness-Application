// ? Importing React libs and routers for operation of page
import React, { Fragment, useState, useEffect } from "react";

import { useRouter } from "next/router";
import { createMemoryHistory } from "history";
const history = createMemoryHistory();
// ? Components
import Landing from "../pages/landing";
import Login from "../pages/Authentication/Login/index.tsx";
import Register from "../pages/Authentication/Register/index.tsx";
import Dashboard from "../pages/Dashboard";
import { route } from "next/dist/server/router";

export default function Home() {
  const router = useRouter();
  // ?Authnetication useState for user Authentication
  const [isAuthenticated, setAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setAuthenticated(boolean);
  };
  // ? We check if the user has token or not using is-verify API
  const isAuth = async () => {
    const rsponse = await fetch("http://localhost:5000/auth/is-verify", {
      method: "GET",
      headers: {
        token: localStorage.token,
      },
    });
    const parseRes = await rsponse.json();
    parseRes === true ? setAuthenticated(true) : setAuthenticated(false);
  };
  //? Here we are making browser to run isAuth function once the whole page mounts
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div>
      <Landing />
    </div>
  );
}
