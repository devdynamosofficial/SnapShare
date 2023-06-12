import { Databases, ID, Storage, Query } from "appwrite";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import appwriteClient from "@/libs/appwrite"

const Card = ({ info, user }) => {
  const [reaction, setReaction] = useState(info.react_count);
  const [image, setImage] = useState("");
  const databases = new Databases(appwriteClient);
  const [isReacted, setReacted] = useState(false);
  useEffect(()=>{
    async function fetchReaction(){
      var re = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_REACTION_COLLECTION_ID, [
        Query.equal("user_id", [user.currentAccount.$id]),
        Query.equal("post_id", info.$id)
      ]);
      if(re.total > 0) setReacted(true);
    }
    fetchReaction();
    const storage = new Storage(appwriteClient);
    const result = storage.getFilePreview(process.env.NEXT_PUBLIC_BUCKET_ID, info.image_location, undefined, undefined, undefined, 100);
    setImage(result.toString());
  });
  if (!info) {
    // Handle case when info is undefined or doesn't have required properties
    return "";
  }
  function updateReaction(){
    databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_REACTION_COLLECTION_ID, ID.unique(), {
      name: user.currentAccount.name,
      user_id: user.currentAccount.$id,
      reaction_type: "love",
      picture_location: "",
      post_id: info.$id,
      reaction_time: new Date()
    }).then(response=>{
      setReaction((r)=>r+1);
      setReacted(true);
      databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_POST_COLLECTION_ID, info.$id, {react_count: reaction+1});
    });
  }
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-3 mb-6">
        <div className="flex md:w-[40%] w-[100%] items-center gap-2">
          <Image
            src={image || ""}
            className="rounded-full w-10 h-10"
            height={50}
            width={50}
            alt="profile pic"
          />
          <div className="flex flex-col">
            <div className="text-md font-bold text-white">
              {info.name}
            </div>
            <div className="text-sm text-slate-500">{info.email}</div>
          </div>
        </div>
        <div className="w-full h-[40vh] md:h-[65vh] justify-center items-center flex">
          <Image
            src={image || ""}
            className="w-[100%] md:w-[40%] h-[100%] md:h-[100%] rounded-2xl"
            height={900}
            width={900}
            alt="profile pic"
          />
        </div>
        <div className="flex justify-between items-center p-2 gap-4 md:w-[40%] w-[100%]">
          <div className="w-[70%] overflow-hidden">
            <div className="text-md font-bold text-white">
              {info.name}
            </div>
            <div className="text-slate-500" style={{ wordWrap: "break-word" }}>
              {info.caption}
            </div>
          </div>
          <div className="flex flex-col text-white justify-center gap-4 items-center w-[30%]">
            <div className="flex gap-4">
              {
                isReacted ? <AiFillHeart size={30} className="cursor-pointer"></AiFillHeart> : <AiOutlineHeart
                    onClick={() => updateReaction()}
                    size={30}
                    className="cursor-pointer"
                  />
              }
              <IoIosShareAlt size={30} />
            </div>
            <div className="text-slate-500"> {reaction} Reacted</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
