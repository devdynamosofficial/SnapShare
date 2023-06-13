import Image from "next/image";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import DisplayExploreImage from "./DisplayExploreImage";

const Discover = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("https://randomuser.me/api/?results=50");
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
          <div className="flex flex-col mx-auto items-center gap-24">
            <Header />
            <div className="text-white w-full text-center gap-4 flex flex-col text-2xl md:mt-0 mt-16 md:text-5xl">
              Discover
              <div className="grid grid-cols-3 place-items-center gap-3 w-full">
              {data.map((data) => {
              return <DisplayExploreImage key={data.id} img={data} />;
            })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
