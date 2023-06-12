import CaptionAtom from "@/atoms/CaptionAtom";
import FileAtom from "@/atoms/FileAtom";
import PostingAtom from "@/atoms/PostingAtom";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";

const Card = ({ info }) => {
  const [reaction, setReaction] = useState(0);
  const [file] = useAtom(FileAtom);
  const [caption, setCaption] = useAtom(CaptionAtom);
  const [postClicked, setPostClicked] = useAtom(PostingAtom);

  if (!info || !info.picture || !info.name) {
    // Handle case when info is undefined or doesn't have required properties
    return null;
  }
  return (
    <>
      {file && postClicked ? (
        <div className="w-full flex flex-col justify-center items-center gap-3 mb-6">
          <div className="flex md:w-[40%] w-[100%] items-center gap-2">
            <Image
              src={info.picture.large}
              className="rounded-full w-10 h-10"
              height={50}
              width={50}
              alt="profile pic"
            />
            <div className="flex flex-col">
              <div className="text-md font-bold text-white">
                {info.name.first} {info.name.last}
              </div>
              <div className="text-sm text-slate-500">Gardender</div>
            </div>
          </div>
          <div className="w-full h-[40vh] md:h-[65vh] justify-center items-center flex">
            <Image
              src={URL.createObjectURL(file)}
              className="w-[100%] md:w-[40%] h-[100%] md:h-[100%] rounded-2xl"
              height={900}
              width={900}
              alt="profile pic"
            />
          </div>
          <div className="flex justify-between items-center p-2 gap-4 md:w-[40%] w-[100%]">
            <div className="w-[70%] overflow-hidden">
              <div className="text-md font-bold text-white">
                {info.name.first} {info.name.last}
              </div>
              <div
                className="text-slate-500"
                style={{ wordWrap: "break-word" }}
              >
                {caption}
              </div>
            </div>
            <div className="flex flex-col text-white justify-center gap-4 items-center w-[30%]">
              <div className="flex gap-4">
                <AiOutlineHeart
                  onClick={() => setReaction(reaction + 1)}
                  size={30}
                  className="cursor-pointer"
                />
                <IoIosShareAlt size={30} />
              </div>
              <div className="text-slate-500"> {reaction} Reacted</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid h-[80vh] place-items-center text-white text-2xl md:text-6xl">
          No Posts
        </div>
      )}
    </>
  );
};

export default Card;
