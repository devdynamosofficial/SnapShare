import Signup from "./Signup";
import { useAtom } from "jotai";
import LoginSignupAtom from "@/atoms/LoginSignupAtom";
import { useState } from "react";
import { useRouter } from "next/router";
import { CgLivePhoto } from "react-icons/cg";

const Login = () => {
  const inpData = (e) => {
    e.preventDefault();
    if (e.target.email.value != "" && e.target.email.value != "") {
      const userData = {
        email: e.target.email.value,
        password: e.target.pass.value,
      };
      console.log(userData);
      router.push("/home");
    }
  };

  const [open, setOpen] = useAtom(LoginSignupAtom);
  const router = useRouter();
  const create = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <div className="grid place-items-center mx-auto h-screen w-full md:w-[80%]">
        <div className="w-full flex md:flex-row flex-col justify-center items-center gap-7 p-5">
          <div className="flex flex-col gap-4 p-2">
            <div href="/home" className="flex justify-center items-center text-white font-bold gap-2 p-2 my-4 mb-5">
              <CgLivePhoto size={60} />
              <div className="text-6xl font-bold pt-1">SnapShare</div>
            </div>
            <div className="text-white text-xl font-normal">
              Unleash your creativity through shared memories
            </div>
          </div>

          {open ? (
            <Signup />
          ) : (
            <div className="border border-[#868686] w-full md:w-[45%] bg-white rounded-xl p-6 flex justify-center items-center">
              <div className="flex flex-col w-full gap-3 p-3">
                <form onSubmit={inpData}>
                  <input
                    id="email"
                    type="email"
                    className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
                    placeholder="Enter email"
                    required
                  />
                  <input
                    type="password"
                    className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
                    id="pass"
                    placeholder="Enter password"
                    required
                  />
                  <input
                    type="submit"
                    className="px-4 text-lg cursor-pointer bg-[#042F10] border-none outline-none text-white py-2 mb-8 w-full rounded-xl border border-black hover:bg-white hover:text-[#042F10] hover:shadow-lg hover:shadow-[#042F10] hover:scale-105 transition-all duration-200"
                    value="Log in"
                  />
                </form>
                <div className="w-full border border-[#747373] my-4"></div>
                <input
                  onClick={create}
                  type="submit"
                  className="px-4 text-lg cursor-pointer bg-[#04531A] border-none outline-none text-white py-2 mb-3 w-4/5 md:w-1/2 mx-auto rounded-xl border border-black hover:bg-white hover:text-[#042F10] hover:shadow-lg hover:shadow-[#042F10] hover:scale-105 transition-all duration-200"
                  value="Create account"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
