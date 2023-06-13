import UploadAtom from "@/atoms/UploadAtom";
import { useAtom } from "jotai";
import { useState } from "react";
import { MdPhotoLibrary } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import FileAtom from "@/atoms/FileAtom";
import CaptionAtom from "@/atoms/CaptionAtom";
import PostingAtom from "@/atoms/PostingAtom";
import { Databases, ID, Storage, Functions } from "appwrite";
import appwriteClient from '@/libs/appwrite';
import useUser from "@/hooks/useUser";

const Post =  () => {
  const [showPopup, setShowPopup] = useAtom(UploadAtom);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useAtom(FileAtom);
  const [caption, setCaption] = useAtom(CaptionAtom);
  const [postClicked, setPostClicked] = useAtom(PostingAtom);
  const {currentAccount}=useUser();
  
  
  
  const storage = new Storage(appwriteClient);

  const handleClosePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = "auto";
  };

  const handleEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };
  const drop = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };
  const handelInput = (e) => {
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
  };

  const handlePost = async () => {
    
    const databases = new Databases(appwriteClient);
          const fileId=ID.unique();
          console.log(fileId);
          const promise = storage.createFile(
              process.env.NEXT_PUBLIC_BUCKET_ID,
              fileId,
              file
          );
          const photoId= await (promise);
          try {
            if(photoId.$id){
              const create_document = await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_POST_COLLECTION_ID, ID.unique(), {
                user_id:currentAccount.$id,
                post_id:photoId.$id,
                react_count:0,
                image_location:`${photoId.$id}`,
                caption:caption,
                name:currentAccount.name,
                email: currentAccount.email,
                creation_time: new Date()
              });
              if(create_document.$id){
                const functions = new Functions(appwriteClient);
                let function_promise = await functions.createExecution(process.env.NEXT_PUBLIC_FUNCTION_LPU_ID, currentAccount.$id);
                console.log(function_promise)
                clearPost();
                handleClosePopup();
              }
            }
          } catch (error) {
            console.log(error);
          }
          
          
        
    document.body.style.overflow = "auto";
    setShowPopup(false)
    setPostClicked(true);
  };

  const clearPost = () => {
    setFile(null);
    setPostClicked(false);
  };

  return (
    <>
      <div className="w-full md:w-[40%] mt-28 md:mt-10 gap-3 mx-auto flex flex-col justify-center items-end">
        <div
          onDragEnter={handleEnter}
          onDragLeave={handleLeave}
          onDragOver={handleOver}
          onDrop={drop}
          className={`w-[100%] bg-white h-[70vh] md:h-[80vh] flex flex-col gap-8 text-black p-6 rounded-xl font-bold mx-auto ${
            isDragging ? "bg-gray-500" : "bg-white"
          }`}
        >
          {file !== null ? (
            <div className="w-[100%] bg-white h-[40vh] md:h-[80vh] flex flex-col gap-8 text-black p-6 rounded-xl font-bold mx-auto">
              <div className="text-xl">Uploaded File:</div>
              <div className="w-full h-full mx-auto md:h-60 md:w-60 flex justify-center items-center">
                <Image
                  className="h-full w-full object-contain"
                  src={URL.createObjectURL(file)}
                  height={400}
                  width={400}
                  alt="pic"
                />
              </div>

              <input
              onChange={(e) => setCaption(e.target.value)}
                type="text"
                className="w-full px-4 py-2 outline-none border-slate-400 border-b-2"
                placeholder="Add a comment"
              />
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={clearPost}
                  className="w-1/3 px-5 py-2 rounded-xl text-white bg-red-600"
                >
                  Discard
                </button>
                <button
                  onClick={handlePost}
                  className="w-1/3 px-5 py-2 rounded-xl text-white bg-[#001B00]"
                >
                  Post
                </button>
              </div>
            </div>
          ) : (
            <div className="w-[100%] bg-white h-[60vh] md:h-[80vh] flex flex-col gap-8 text-black p-6 rounded-xl font-bold mx-auto">
              <div className="text-xl">Upload Your File:</div>
              <div className="h-full w-full border-2 p-4 flex gap-2 flex-col justify-center items-center border-slate-500 border-dotted">
                <MdPhotoLibrary className="text-blue-600" size={80} />
                <div className="w-[45%] text-blue-600 text-center text-2xl">
                  Drag & Drop File
                </div>
                <div className="text-blue-500">Or</div>
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
              <div className="w-full md:mt-0 flex justify-end">
                <AiFillCloseCircle
                  onClick={handleClosePopup}
                  className="text-black mx-auto flex cursor-pointer"
                  size={50}
                />
              </div>
            </div>
          )}
        </div>
        {postClicked && file && (
          <div className="mt-4">
            <h3>Posted Image:</h3>
            <Image
              src={URL.createObjectURL(file)}
              alt="Posted Image"
              height={200}
              width={200}
            />
          </div>
        )}
        {postClicked && !file && (
          <div className="mt-4">
            <h3>No Image Posted</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
