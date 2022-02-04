import Image from "next/image";
import Link from "next/link";
interface Props {
  buttons: Boolean;
}
const Header = (props: Props) => {
  return (
    <div className="h-24 flex flex-row flex-wrap justify-between z-10 sticky top-0 drop-shadow-md left-0 right-0 bg-navcolor ">
      <div className="px-5">
        {/* Remove Link after development */}
        <Link href="/">
          <Image
            className=""
            src="/icons/Logo.svg"
            alt="Logo"
            width={280}
            height={90}
          />
        </Link>
      </div>
      {props.buttons == true && (
        <div className="flex flex-row pl-36 w-1/3">
          <Link href="/Authentication/Login">
            <button className="px-5">
              <p className="text-xl font-normal">Login</p>
            </button>
          </Link>
          <Link href="/Authentication/Register">
            <div className="flex flex-row px-3 ml-7 justify-center items-center ">
              <p className=" cursor-pointer font-normal text-xl border-2 rounded-3xl border-gray-400 py-2 px-3 ">
                Sign Up
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Header;
