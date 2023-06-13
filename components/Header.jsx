import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgLivePhoto } from "react-icons/cg";
import { Databases, Query, Storage } from "appwrite";
import appwriteClient from "@/libs/appwrite";
import useUser from "@/hooks/useUser";


const Header = () => {
  
  const [imageUrl, setImageUrl] = useState('');
  const {currentAccount, isLoadingAccount} = useUser();

  useEffect(function(){
    const databases=new Databases(appwriteClient);
    const fetchProfilePic = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
          [Query.equal('user_id', [currentAccount.$id])]
        );
        const docId = response.documents[0]?.profile_pic;
        if (docId) {
          setImageUrl(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${docId}/preview?quality=10&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`);
        }else{
          setImageUrl(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/64887b6428d789279d1c/preview?quality=10&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
    if (currentAccount) {
      fetchProfilePic();
    }
  }, [isLoadingAccount]);
    return (
        <>
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
                src={imageUrl}
                height={50}
                width={50}
                alt="Profile"
                className="rounded-full cursor-pointer"
              />
            </Link>
          </div>
        </>
    );
}

export default Header;