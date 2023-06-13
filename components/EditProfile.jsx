import EditAtom from "@/atoms/EditAtom";
import FileAtom from "@/atoms/FileAtom";
import HobbyAtom from "@/atoms/HobbyAtom";
import ProfilePictureAtom from "@/atoms/ProfilePictureAtom";
// import UploadAtom from "@/atoms/UploadAtom";
import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import appwriteClient from '@/libs/appwrite';
import useUser from "@/hooks/useUser";
import { Databases, ID, Query, Storage } from "appwrite";
import { useRouter } from "next/router";

const EditProfile = () => {
  const {currentAccount:user}=useUser();
  const databases = new Databases(appwriteClient);
  const [hobby, setHobby] = useAtom(HobbyAtom);
  const [file, setFile] = useAtom(FileAtom);
  const [showEdit, setShowEdit] = useAtom(EditAtom);
  const [uploadProfilePic, setUploadProfilePic] = useAtom(ProfilePictureAtom);
  const storage = new Storage(appwriteClient);
  const router = useRouter();
  const handleClosePopup = () => {
    setShowEdit(false);
    document.body.style.overflow = "auto";
    setFile(null);
  };
  const handelInput = (e) => {
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
  };
  const fileId=ID.unique();
  const editProfile = async () => {
    const promise = storage.createFile(
      process.env.NEXT_PUBLIC_BUCKET_ID,
      fileId,
      file
  );
  const photoId=await (promise);
  
    if(!user){
      return null;
    }
    

  var promise2 = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_USER_COLLECTION_ID, [Query.equal('user_id', [user.$id])]);
  var doc_id = promise2.documents[0].$id;
  console.log(doc_id);

    if(photoId){
      console.log(photoId);
      const create_document = await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_USER_COLLECTION_ID,doc_id , {
        profile_pic:photoId.$id
      });
      router.reload();
    }
    setUploadProfilePic(true);
    setShowEdit(false);
    console.log("Clicked: ", uploadProfilePic);
  };

  return (
    <>
      <div className="w-full md:w-[40%] mt-28 md:mt-10 gap-3 mx-auto flex flex-col justify-center items-end z-50">
        <div className="w-[100%] bg-white h-[70vh] md:h-[80vh] flex flex-col gap-8 text-black p-6 rounded-xl font-bold mx-auto ">
          <div className="w-[100%] bg-white h-[60vh] md:h-[80vh] flex flex-col gap-8 text-black p-6 rounded-xl font-bold mx-auto border justify-center items-center">
            <div className="text-xl text-center">Upload Profile Picture</div>
            {file ? (
              <div className="h-28 w-28 rounded-full mx-auto border-2 flex gap-2 flex-col justify-center items-center border-slate-500 border-dotted">
                <div className="w-full rounded-full object-contain h-full">
                  <Image
                    className="w-full h-full rounded-full"
                    src={URL.createObjectURL(file)}
                    width={400}
                    height={400}
                    alt="profile pic"
                  />
                </div>
              </div>
            ) : (
              <div className="h-28 w-28 rounded-full mx-auto border-2 p-4 flex gap-2 flex-col justify-center items-center border-slate-500 border-dotted">
                <input
                  onChange={handelInput}
                  type="file"
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Browse
                </label>
              </div>
            )}

            <input
              onChange={(e) => setHobby(e.target.value)}
              type="text"
              placeholder="Enter hobby / occupation"
              className="w-full px-4 py-2 outline-none border-b-2 border-slate-400"
            />
            <div className="flex justify-between items-center w-full">
              <div className="w-full md:mt-0 flex justify-end">
                <IoIosCheckmarkCircle
                  onClick={editProfile}
                  className="mx-auto text-blue-500 flex cursor-pointer"
                  size={50}
                />
              </div>
              <div className="w-full md:mt-0 flex justify-end">
                <AiFillCloseCircle
                  onClick={handleClosePopup}
                  className="text-black mx-auto flex cursor-pointer"
                  size={50}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
