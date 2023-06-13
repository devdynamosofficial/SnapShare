import { Databases, ID, Storage, Query } from "appwrite";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import appwriteClient from "@/libs/appwrite"

const Card = ({ info, user }) => {
  const [reaction, setReaction] = useState(info.react_count);
  const [image, setImage] = useState(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${info.image_location}/preview?quality=10&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`);
  const [profile_pic, setProfilePic] = useState('');
  const databases = new Databases(appwriteClient);
  const [isReacted, setReacted] = useState(false);
  useEffect(()=>{
    async function fetchReaction(){
      var re = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_REACTION_COLLECTION_ID, [
        Query.equal("user_id", [user.currentAccount.$id]),
        Query.equal("post_id", info.$id)
      ]);
      if(re.total > 0) setReacted(true);
      re = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_USER_COLLECTION_ID, [
        Query.equal("user_id", [info.user_id]),
      ]);
      const pic = re.documents[0] && re.documents[0].profile_pic;

      if(pic){
        setProfilePic(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${pic}/preview?quality=10&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`);
      }else{
        setProfilePic(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/64887b6428d789279d1c/preview?quality=10&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`);
        // https://cloud.appwrite.io/v1/storage/buckets/6485deaa466e8566dbbc/files/64887b6428d789279d1c/view?project=6484b64f8a8f3fa14c4c&mode=admin
      }
      setImage(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${info.image_location}/preview?quality=100&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`);
    }
    fetchReaction();
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
      <div className="w-full flex flex-col justify-center items-center gap-3 mb-6 h-fit">
        <div className="flex md:w-[40%] w-[100%] items-center gap-2">
          <img
            src={profile_pic}
            className="rounded-full w-10 h-10 max-w-full"
            alt="profile pic"
          />
          <div className="flex flex-col">
            <div className="text-md font-bold text-white">
              {info.name}
            </div>
            <div className="text-sm text-slate-500">{info.email}</div>
          </div>
        </div>
        <div className="w-full justify-center items-center flex">
          <img
            src={image}
            className="w-[100%] md:w-[40%] rounded-2xl max-w-full"
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
