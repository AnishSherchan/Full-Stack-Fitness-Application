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
  // ! Secure routes for navigation
  return (
    <div>
      <Landing />{" "}
    </div>
  );
}
