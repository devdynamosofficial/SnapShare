import { CgLivePhoto } from "react-icons/cg";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Card from "./Card";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("https://randomuser.me/api/");
      const res = await req.json();
      setData(res.results);
      console.log(res.results);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex max-w-full md:mt-0 relative">
        <Sidebar />
        <div className="md:ml-[20%] w-full mx-auto flex flex-col justify-center gap-12 items-center p-10 md:mt-4">
          <div className="w-full grid md:hidden place-items-center grid-flow-col pt-3 gap-6 bg-[#001B00]/30 backdrop-blur-md fixed top-0">
            <Link
              href="/home"
              className="flex items-center gap-2 p-2 my-4 mb-5 text-white"
            >
              <CgLivePhoto size={32} />
              <div className="text-3xl font-bold pt-1">SnapShare</div>
            </Link>
            <Link href="/profile">
              <Image
                src="/man.jpg"
                height={50}
                width={50}
                alt="Profile"
                className="rounded-full cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex flex-col gap-6 w-full mt-20 md:mt-2">
            {data.map((data) => {
              return <Card key={data.id} info={data} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
