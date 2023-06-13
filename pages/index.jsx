import Login from "@/components/Login";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";

const index = () => {
  const {isLoadingAccount, currentAccount} = useUser();
  useEffect(()=>{
    function fetchAccount(){
      if(!currentAccount) return;
      document.location='/home';
    }
    fetchAccount();
  },[isLoadingAccount])
  return (
    <>
      {isLoadingAccount?(
        <div className="text-white flex justify-center items-center text-3xl">Please wait..</div>
      ):(<Login/>)}
    </>
  );
}

export default index;