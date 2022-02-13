import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import Verify from "./HOC/Verify";
const dashboard = () => {
  const button = false;
  const button1 = true;
  const [isOpen, setIsOpen] = useState(false);
  return <div>Dash</div>;
};

export default Verify(dashboard);
