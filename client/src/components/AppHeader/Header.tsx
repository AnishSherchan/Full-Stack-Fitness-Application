import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Transition } from "@headlessui/react";
interface Props {
  buttons: Boolean;
  verifyContent: Boolean;
}
const Header = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" drop-shadow-lg z-10 sticky top-0 left-0 right-0">
      <nav className="bg-navcolor">
        <div className=" mx-auto sm:px-6  px-4 lg:px-5">
          <div className="flex items-center justify-center h-24">
            <div className="flex w-full  justify-between items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    className=""
                    src="/icons/Logo.svg"
                    alt="Logo"
                    width={270}
                    height={90}
                  />
                </Link>
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
                    <Link href="/Authentication/Login">
                      <button className="px-5">
                        <p className="text-lg font-normal">dashboard</p>
                      </button>
                    </Link>
                    <Link href="/Authentication/Register">
                      <button className="px-5">
                        <p className="text-lg font-normal">Workout</p>
                      </button>
                    </Link>
                    <Link href="/Authentication/Login">
                      <button className="px-5">
                        <p className="text-lg font-normal">Exercise</p>
                      </button>
                    </Link>
                    <Link href="/Authentication/Login">
                      <button className="px-5">
                        <p className="text-lg font-normal">supplement</p>
                      </button>
                    </Link>
                    <Link href="/Authentication/Login">
                      <button className="px-5">
                        <p className="text-lg font-normal">Todo</p>
                      </button>
                    </Link>
                  </div>
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
          {(ref) => (
            <div className="lg:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {props.buttons == true && (
                  <>
                    <a href="#" className="block text-xl text-black">
                      Login
                    </a>

                    <a href="#" className="block text-black ">
                      Sign Up
                    </a>
                  </>
                )}
                {props.verifyContent == true && (
                  <>
                    <a href="#" className="block text-black">
                      Login
                    </a>

                    <a href="#" className="block text-black ">
                      Sign Up
                    </a>
                  </>
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
