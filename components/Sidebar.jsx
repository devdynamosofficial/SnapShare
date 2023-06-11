import Image from "next/image";
import Link from "next/link";
import { MdOutlineExplore } from "react-icons/md";
import { BsChatSquareDots } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {BiLogOut} from "react-icons/bi"
import { MdKeyboardArrowRight } from "react-icons/md";
import { CgLivePhoto } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import useUser from "@/hooks/useUser";

const Sidebar = () => {
  const {logout}=useUser();
  return (
    <>
      <div className="text-white shadow-md bg-[#01250B] w-[20%] h-screen p-5 fixed md:block hidden">
        <Link href="/home" className="flex items-center gap-2 p-2 my-4 mb-5">
          <CgLivePhoto size={32} />
          <div className="text-3xl font-bold pt-1">SnapShare</div>
        </Link>
        <div className="flex flex-col gap-8 p-3">
          <Link
            href="/home"
            className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00]"
          >
            <AiFillHome size={22} />
            <div className="text-lg font-bold pt-2">Home</div>
          </Link>
          <button className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00]">
            <LuSearch size={22} />
            <div className="text-lg font-bold pt-2">Search</div>
          </button>
          <Link
            href="/discover"
            className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-1"
          >
            <MdOutlineExplore size={22} />
            <div className="text-lg font-bold pt-1">Discover</div>
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-2"
          >
            <BsChatSquareDots size={22} />
            <div className="text-lg font-bold ">Chats</div>
          </Link>
          <button className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-1">
            <AiOutlinePlusCircle size={22} />
            <div className="text-lg font-bold pt-1">Create</div>
          </button>

          <button className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-1" onClick={logout}>
            <BiLogOut size={22} />
            <div className="text-lg font-bold pt-1">Logout</div>
          </button>
          
        </div>
        <Link
          href="/profile"
          className="flex items-center gap-3 mt-16 px-4 py-3 rounded-xl bg-[#001B00]"
        >
          <Image
            src="/man.jpg"
            height={50}
            width={50}
            alt="Profile"
            className="rounded-xl"
          />
          <div className="flex flex-col">
            <div className="text-lg font-bold text-white">John Doe</div>
            <div className="text-slate-500 text-md">Photographer</div>
          </div>
          <div className="flex justify-end items-end w-full">
            <MdKeyboardArrowRight size={30} />
          </div>
        </Link>
      </div>
      <div className="w-full fixed bg-[#001B00]/30 backdrop-blur-md border-[#414141]/50 border bottom-0 px-20 flex justify-evenly items-center text-white py-1 md:hidden">
      <Link
            href="/home"
            className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00]"
          >
            <AiFillHome size={25} />
          </Link>
          <button className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00]">
            <LuSearch size={25} />
          </button>
          <Link
            href="/discover"
            className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-1"
          >
            <MdOutlineExplore size={25} />
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-2"
          >
            <BsChatSquareDots size={25} />
          </Link>
          <button className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-1">
            <AiOutlinePlusCircle size={25} />

          </button>
      </div>
    </>
  );
};

export default Sidebar;
