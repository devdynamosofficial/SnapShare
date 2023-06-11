import LoginSignupAtom from "@/atoms/LoginSignupAtom";
import { FETCH_STATUS } from "@/utils/constants";
import { Account, Databases, ID } from "appwrite";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import appwriteClient from "@/libs/appwrite"
import { CgLivePhoto } from "react-icons/cg";
import Link from "next/link";
const Signup = () => {
  const router = useRouter();
  const [form, setForm] = React.useState({
    name: '',
    age:'',
    gender:'',
    email: '',
    password: '',
    error: '',
  });

  const [signupStatus, setSignupStatus] = React.useState(FETCH_STATUS.IDLE);
  const hasErrors = !!form.error;
  const onChangeInput = (event) => {
    const {
      target: { name, value },
    } = event;
    setForm((currState) => ({ ...currState, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSignupStatus(FETCH_STATUS.LOADING);

    const account = new Account(appwriteClient);

    const { email, password, name, age,gender } = form;
    console.log(form);
    // Bit that creates the account, we use ID.unique() to create a unique identifier for the user
    const promise = account.create(ID.unique(), email, password, name);
    const userId=(await promise).$id;

    try {
      const userAccount = await promise;
      // If this code is reached it means resource was successfully created, redirect the logged user to the sign in page
      const databse_id=process.env.NEXT_PUBLIC_DATABASE_ID;
      const user_collection_id=process.env.NEXT_PUBLIC_USER_COLLECTION_ID;
      const databases=new Databases(appwriteClient);
      databases.createDocument(databse_id,user_collection_id,ID.unique(),{
        name:name,
        age:age,
        gender:gender,
        user_id:userId
      })

      setSignupStatus(FETCH_STATUS.SUCCESS);


      router.push('/auth/signin');
    } catch (error) {
      // If there is an error appwrite sends the message along with the code
      setForm((currForm) => ({
        ...currForm,
        error: error.message,
      }));
      setSignupStatus(FETCH_STATUS.FAIL);
    }
  }
  const [open, setOpen] = useAtom(LoginSignupAtom);
  
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
          {(
            <div className="border border-[#868686] bg-white rounded-xl p-6 flex w-full md:w-[45%]">
            <div className="flex flex-col gap-3 p-3">
              <form onSubmit={onSubmit}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  
                  className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
                  placeholder="Enter Name"
                  required
                  value={form.name}
                  onChange={onChangeInput}
                />
                <input
                id="age"
                type="text"
                name="age"
                className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
                placeholder="Enter Age"
                required
                value={form.age}
                onChange={onChangeInput}
                />
                <input
                id="gender"
                type="text"
                name="gender"
                className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
                placeholder="Enter Gender"
                required
                value={form.gender}
                onChange={onChangeInput}
                />
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
                  placeholder="Enter email"
                  required
                  value={form.email}
                  onChange={onChangeInput}
                />
                <input
                  id="pass"
                  type="password"
                  name="password"
                  className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
                  placeholder="Enter password"
                  required
                  value={form.password}
                  onChange={onChangeInput}
                />
                <input
                  type="submit"
                  className="px-4 text-lg cursor-pointer bg-[#042F10] border-none outline-none text-white py-2 mb-8 w-full rounded-xl border border-black hover:bg-white hover:text-[#042F10] hover:shadow-lg hover:shadow-[#042F10] hover:scale-105 transition-all duration-200"
                  value="Register"
                />
              </form>
              <div className="w-full border border-[#747373] my-4"></div>
              <div className="mx-auto">Already have an account?</div>
              <div className="flex justify-end">
                <Link href="/auth/signin" className="px-4 text-lg cursor-pointer bg-[#042F10] border-none outline-none text-white py-2 mb-8 w-full rounded-xl border border-black hover:bg-white hover:text-[#042F10] hover:shadow-lg hover:shadow-[#042F10] hover:scale-105 transition-all duration-200"
                >Log In</Link>
              </div>
            </div>
          </div>
          )}
      </div>
    </div>
      
    </>
  );
};

export default Signup;
