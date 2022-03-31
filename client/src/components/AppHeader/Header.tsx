// Todo CHANGE href to Link
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Transition } from "@headlessui/react";
interface Props {
  buttons: Boolean;
  verifyContent: Boolean;
  CurrentPage: number;
}
const Header = (props: Props) => {
  let Flag = false;
  const [isOpen, setIsOpen] = useState(false);
  if (props.verifyContent == false && props.buttons == false) {
    Flag = true;
  }
  const Click = () => {
    localStorage.removeItem("token");
    toast.success("Logged out Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className=" drop-shadow-lg z-10 sticky top-0 left-0 right-0">
      <nav className="bg-navcolor">
        <div className=" mx-auto sm:px-6  px-4 lg:px-5">
          <div className="flex items-center justify-center h-24">
            <div className="flex w-full  justify-between items-center">
              <div className="flex-shrink-0">
                <Image
                  className=""
                  src="/icons/Logo.svg"
                  alt="Logo"
                  width={270}
                  height={90}
                />
              </div>
              <div className=" hidden lg:block pr-9">
                {props.buttons == true && (
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/Authentication/Login">
                      <button className="px-5">
                        <p className="text-lg font-normal">Login</p>
                      </button>
                    </Link>
                    <Link href="/Authentication/Register">
                      <div className="flex flex-row px-3 ml-7 justify-center items-center ">
                        <p className=" cursor-pointer font-normal text-lg border-2 rounded-3xl border-gray-400 py-2 px-3 ">
                          Sign Up
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
                {props.verifyContent == true && (
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/dashboard">
                      <a
                        style={
                          props.CurrentPage === 1 ? { color: "#4B8CF6" } : {}
                        }
                        className="block px-3 text-xl text-black"
                      >
                        Dashboard
                      </a>
                    </Link>

                    <Link href="/plan">
                      <a
                        style={
                          props.CurrentPage === 2 ? { color: "#4B8CF6" } : {}
                        }
                        className="block px-3 text-xl text-black"
                      >
                        Plan
                      </a>
                    </Link>

                    <Link href="/exercise">
                      <a
                        style={
                          props.CurrentPage === 3 ? { color: "#4B8CF6" } : {}
                        }
                        className="block px-3 text-xl text-black"
                      >
                        Exercise Guid
                      </a>
                    </Link>

                    <Link href="/supplements">
                      <a
                        style={
                          props.CurrentPage === 4 ? { color: "#4B8CF6" } : {}
                        }
                        className="block px-3 text-xl text-black"
                      >
                        Supplement
                      </a>
                    </Link>
                    <Link href="/meal">
                      <a
                        style={
                          props.CurrentPage === 5 ? { color: "#4B8CF6" } : {}
                        }
                        className="block px-3 text-xl text-black"
                      >
                        Meal Plan
                      </a>
                    </Link>

                    <Link href="/">
                      <button onClick={Click} className="px-3 cursor-pointer">
                        <Image
                          src="/icons/Logout.svg"
                          alt="Logo"
                          width={22}
                          height={22}
                        />
                      </button>
                    </Link>
                  </div>
                )}
                {Flag == true && (
                  <Link href="/">
                    <a className="block px-3 text-xl text-black">Home</a>
                  </Link>
                )}
              </div>
            </div>
            <div className="-mr-2 flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(useRef) => (
            <div className="lg:hidden" id="mobile-menu">
              <div ref={useRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {props.buttons == true && (
                  <>
                    <Link href="/Authentication/Login">
                      <a className="block text-xl text-black">Login</a>
                    </Link>

                    <Link href="/Authentication/Register">
                      <a className="block text-xl text-black">Sign Up</a>
                    </Link>
                  </>
                )}
                {props.verifyContent == true && (
                  <>
                    <Link href="/dashboard">
                      <a className="block text-xl text-black">Dashboard</a>
                    </Link>

                    <Link href="/plan">
                      <a className="block text-xl text-black">Plan</a>
                    </Link>

                    <Link href="/exercise">
                      <a className="block text-xl text-black">Exercise Guid</a>
                    </Link>

                    <Link href="/supplements">
                      <a className="block text-xl text-black">Supplement</a>
                    </Link>
                    <Link href="/meal">
                      <a className="block text-xl text-black">Meal Plan</a>
                    </Link>

                    <Link href="/">
                      <a onClick={Click} className="block text-xl text-black">
                        Logout
                      </a>
                    </Link>
                  </>
                )}

                {Flag == true && (
                  <Link href="/">
                    <a className="block px-3 text-xl text-black">Home</a>
                  </Link>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};
export default Header;
