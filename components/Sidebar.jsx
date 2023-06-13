import Image from "next/image";
import Link from "next/link";
import { MdOutlineExplore } from "react-icons/md";
import { BsChatSquareDots } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CgLivePhoto } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { useAtom } from "jotai";
import FileAtom from "@/atoms/FileAtom";
import UploadAtom from "@/atoms/UploadAtom";
import Post from "./Post";
import SearchAtom from "@/atoms/SearchAtom";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { Databases, Query, Storage } from "appwrite";
import appwriteClient from "@/libs/appwrite";

const Sidebar = (props) => {
  const [showPopup, setShowPopup] = useAtom(UploadAtom);
  const [searchbar, setSearchbar] = useAtom(SearchAtom);
  const [file, setFile] = useAtom(FileAtom);
  const user = props.user;
  const [imageUrl, setImageUrl] = useState('');
  const [profilePic,setProfilePic]=useState('');
  const storage = new Storage(appwriteClient);
  
  const databases=new Databases(appwriteClient);
  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!user) {
        return;
      }
  
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
          [Query.equal('user_id', [user.$id])]
        );
  
        const docId = response.documents[0]?.profile_pic;
  
        if (docId) {
          fetchPreviewUrl(docId);
        }else{
          setImageUrl(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/64887b6428d789279d1c/preview?quality=10&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
  
    const fetchPreviewUrl = async (docId) => {
      try {
        const previewUrl = await storage.getFilePreview(process.env.NEXT_PUBLIC_BUCKET_ID, docId,undefined,undefined,undefined, 50);
        setImageUrl(previewUrl.href);
      } catch (error) {
        console.error('Error fetching preview URL:', error);
      }
    };
  
    fetchProfilePic();
  }, [user]);
  const handleButtonClick = () => {
    setShowPopup(true);
    document.body.style.overflow = "hidden";
  };
  const openSearch = () => {
    setSearchbar(true);
  }

  const handelInput = (e) => {
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
  };

  return (
    <>
      <div className="text-white shadow-md bg-[#01250B] w-[20%] h-screen p-5 fixed md:block hidden">
        <Link href="/home" className="flex items-center gap-2 p-2 my-4 mb-5">
          <CgLivePhoto size={32} />
          <div className="text-3xl font-bold pt-1">SnapShare</div>
        </Link>
        <div className="flex flex-col gap-8 p-3">
          <Link
            href="/home"
            className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00]"
          >
            <AiFillHome size={22} />
            <div className="text-lg font-bold pt-2">Home</div>
          </Link>
          <button onClick={openSearch}  className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00]">
            <LuSearch size={22} />
            <div className="text-lg font-bold pt-2">Search</div>
          </button>
          <Link
            href="/discover"
            className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-1"
          >
            <MdOutlineExplore size={22} />
            <div className="text-lg font-bold pt-1">Discover</div>
          </Link>
          
          <button
            onClick={handleButtonClick}
            className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-1"
          >
            <AiOutlinePlusCircle size={22} />
            <div className="text-lg font-bold pt-1">Create</div>
          </button>
        </div>
        <Link
          href="/profile"
          className="flex items-center gap-3 mt-16 px-4 py-3 rounded-xl bg-[#001B00]"
        >
          <Image
            src={imageUrl}
            height={50}
            width={50}
            alt="Profile"
            className="rounded-xl"
          />
          <div className="flex flex-col">
            <div className="text-lg font-bold text-white">{user && user.name}</div>
            <div className="text-slate-500 text-md">{user && user.email.slice(0, 15)}</div>
          </div>
          <div className="flex justify-end items-end w-full">
            <MdKeyboardArrowRight size={30} />
          </div>
        </Link>
      </div>
      <div className="w-full fixed bg-[#001B00]/30 backdrop-blur-md border-[#414141]/50 border bottom-0 flex justify-evenly items-center text-white py-1 md:hidden">
        <Link
          href="/home"
          className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00]"
        >
          <AiFillHome size={25} />
        </Link>
        <button onClick={openSearch} className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00]">
          <LuSearch size={25} />
        </button>
        <Link
          href="/discover"
          className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-1"
        >
          <MdOutlineExplore size={25} />
        </Link>
        
        <button
          onClick={handleButtonClick}
          className="flex items-center gap-3 hover:bg-[#014501] px-6 py-3 rounded-xl focus:bg-[#001B00] active:bg-[#001B00] mt-1"
        >
          <AiOutlinePlusCircle size={25} />
        </button>
      </div>
      <div
        className={showPopup ? "w-full h-screen fixed bg-black/60" : "hidden"}
      >
        <Post />
      </div>
      <div
        className={searchbar ? "w-full h-screen fixed bg-black/60" : "hidden"}
      >
        <SearchBar />
      </div>
    </>
  );
};

export default Sidebar;
