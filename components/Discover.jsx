import Image from "next/image";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import DisplayExploreImage from "./DisplayExploreImage";
import { Databases, Query } from 'appwrite';
import appwriteClient from '@/libs/appwrite';
import useUser from "@/hooks/useUser";

let post_fetch_count = 0, noPost = false, isFetching = false, isLoadedOnLoad;

const Discover = () => {
  const [data, setData] = useState([]);
  const user = useUser();
  const { currentAccount, isLoadingAccount, friendsList } = user;
  const databases = new Databases(appwriteClient);
  useEffect(() => {
    const fetchPost = async () => {
      if(!isLoadingAccount){
        var limit = 10;
        isFetching = true;
        var post_promise;
        post_promise = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_POST_COLLECTION_ID, [
          Query.limit(limit),
          Query.orderDesc("creation_time"),
          Query.offset(post_fetch_count*limit)
        ]);
        if(post_promise.total>0){
          post_fetch_count++;
          setData(d=>d.concat(post_promise.documents));
        }
        isFetching = false;
      }
    };
    fetchPost();
  }, [isLoadingAccount]);
  return (
    <>
      <div className="flex max-w-full md:mt-0 relative">
        <Sidebar user={user.currentAccount} />
        <div className="md:ml-[20%] w-full mx-auto flex flex-col justify-center gap-12 items-center p-10 md:mt-4">
          <div className="flex flex-col mx-auto items-center gap-24">
            <Header />
            <div className="text-white w-full text-center gap-4 flex flex-col text-2xl md:mt-0 mt-16 md:text-5xl">
              Discover
              <div className="grid grid-cols-3 place-items-center gap-3 w-full">
              {data.map((d) => {
                if(friendsList && (friendsList.documents.filter(f=>(f.friend_id==d.user_id)).length == 1)) return "";
                return <DisplayExploreImage key={d.post_id} img={d} />;
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
