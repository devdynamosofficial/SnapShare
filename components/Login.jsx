import Signup from "./Signup";
import { useAtom } from "jotai";
import LoginSignupAtom from "@/atoms/LoginSignupAtom";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { CgLivePhoto } from "react-icons/cg";
import appwriteClient from "@/libs/appwrite"
import { Account } from "appwrite";
import { FETCH_STATUS } from "@/utils/constants";
import Link from "next/link";

const Login = () => {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    error: '',
  });
  const [signinStatus, setSigninStatus] = React.useState(FETCH_STATUS.IDLE);
  const router = useRouter();
  const hasErrors = !!form.error;

  const onSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = form;

    const account = new Account(appwriteClient);
    const promise = account.createEmailSession(email, password);

    try {
      const userAccount = await promise;

      setSigninStatus(FETCH_STATUS.SUCCESS);
      router.push('/home');
    } catch (error) {
      setForm((currForm) => ({
        ...currForm,
        error: error.message,
      }));
      setSigninStatus(FETCH_STATUS.FAIL);
      return;
    }
  };

  const onChangeInput = (event) => {
    const {
      target: { name, value },
    } = event;
    setForm((currForm) => ({ ...currForm, [name]: value }));
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

          { (
            <div className="border border-[#868686] w-full md:w-[45%] bg-white rounded-xl p-6 flex justify-center items-center">
              <div className="flex flex-col w-full gap-3 p-3">
                <form onSubmit={onSubmit}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. johndoe@gmail.com"
                    autoComplete="email"
                    required
                    onChange={onChangeInput}
                    value={form.email}
                    className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
                    
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter password"
                    required
                    onChange={onChangeInput}
                    value={form.password}
                    className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
                    
                    
                    
                  />
                  <input
                    type="submit"
                    className="px-4 text-lg cursor-pointer bg-[#042F10] border-none outline-none text-white py-2 mb-8 w-full rounded-xl border border-black hover:bg-white hover:text-[#042F10] hover:shadow-lg hover:shadow-[#042F10] hover:scale-105 transition-all duration-200"
                    value="Log in"
                  />
                  {hasErrors && (
                <div className="border-solid py-3 px-5 rounded-md border  border-red-500 bg-red-100 text-red-500">
                  <p>{form.error}</p>
                </div>
              )}
                </form>
                <div className="flex justify-end">
                <Link href="/auth/signup" className="underline cursor-pointer text-green-900" >Regester here if you have no account</Link>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
