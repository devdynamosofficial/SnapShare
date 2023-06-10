import LoginSignupAtom from "@/atoms/LoginSignupAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

const Signup = () => {

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
  }
  const [open, setOpen] = useAtom(LoginSignupAtom);
  const router = useRouter();
  const create = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <div className="border border-[#868686] bg-white rounded-xl p-6 flex w-full md:w-[45%]">
        <div className="flex flex-col gap-3 p-3">
          <form onSubmit={inpData}>
            <input
              id="user"
              type="text"
              className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
              placeholder="Enter username"
              required
            />
            <input
              id="email"
              type="email"
              className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
              placeholder="Enter email"
              required
            />
            <input
              id="pass"
              type="password"
              className="px-4 py-3 mb-8 w-full rounded-xl border border-[#868686] outline-none"
              placeholder="Enter password"
              required
            />
            <input
              type="submit"
              className="px-4 text-lg cursor-pointer bg-[#042F10] border-none outline-none text-white py-2 mb-8 w-full rounded-xl border border-black hover:bg-white hover:text-[#042F10] hover:shadow-lg hover:shadow-[#042F10] hover:scale-105 transition-all duration-200"
              value="Register"
            />
          </form>
          <div className="w-full border border-[#747373] my-4"></div>
          <div className="mx-auto">Already have an account?</div>
          <input
            onClick={create}
            type="submit"
            className="px-4 text-lg cursor-pointer bg-[#04531A] border-none outline-none text-white py-2 mb-3 w-1/2 mx-auto rounded-xl border border-black hover:bg-white hover:text-[#042F10] hover:shadow-lg hover:shadow-[#042F10] hover:scale-105 transition-all duration-200"
            value="Log in"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
