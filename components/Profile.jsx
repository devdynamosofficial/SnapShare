import Image from "next/image";
import Sidebar from "./Sidebar";
import { useAtom } from "jotai";
import EditAtomState from "@/atoms/EditAtom";
import EditProfile from "./EditProfile";
import ProfilePictureAtom from "@/atoms/ProfilePictureAtom";
import HobbyAtom from "@/atoms/HobbyAtom";
import FileAtom from "@/atoms/FileAtom";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { Databases, Query, Storage } from "appwrite";
import appwriteClient from "@/libs/appwrite";
const Profile = (props) => {
  const { currentAccount: user,logout } = useUser(); // Fetch the user object using the useUser hook
  const [profilePic,setProfilePic]=useState('');
  const storage = new Storage(appwriteClient);
  const [imageUrl, setImageUrl] = useState('');
  const [data, setData] = useState([]);

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
      setImageUrl(`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${docId}/preview?quality=10&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`);
    };

    fetchProfilePic();
    fetchMyPosts();

    async function fetchMyPosts(){
      if(!user) return;
      var post_promise = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_POST_COLLECTION_ID, [
        Query.equal("user_id", [user.$id]),
        Query.limit(100),
        Query.orderDesc("creation_time")
      ]);
      setData(d=>d.concat(post_promise.documents));
    }
  }, [user]);
  const [file, setFile] = useAtom(FileAtom);
  const [hobby, setHobby] = useAtom(HobbyAtom);
  const [uploadProfilePic, setUploadProfilePic] = useAtom(ProfilePictureAtom);
  const [showEdit, setShowEdit] = useAtom(EditAtomState);
  const showEditPopup = () => {
    setShowEdit(true);
  };
  if (!user) {
    return null;
  }

  return (
    <div className="flex max-w-full md:mt-0 relative">
      <Sidebar user={user} />
      <div className="md:ml-[20%] w-full mx-auto flex flex-col justify-center gap-12 items-center p-10 md:mt-4">
        <div className="flex flex-col mx-auto items-center gap-24">
          {uploadProfilePic && file ? (
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full">
              {imageUrl && <Image
                  className="w-full h-full rounded-full"
                  src={imageUrl.href}
                  width={300}
                  height={300}
                  alt="profile picture"
                />}
                
              </div>
              <div className="text-white text-4xl font-bold">{user.name}</div> {/* Render the user name */}
              <div className="flex gap-2">
                <button
                  onClick={showEditPopup}
                  className="text-xl hover:scale-110 transition-all duration-200 bg-[#0a430a] rounded-xl px-5 py-2 text-white"
                >
                  Edit Profile
                </button>
                <button className="text-xl hover:scale-110 transition-all duration-200 bg-[#0a430a] rounded-xl px-5 py-2 text-white">
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full overflow-hidden">
                <img
                  className="max-w-full rounded-full"
                  src={imageUrl}
                  alt="profile picture"
                />
              </div>
              <div className="text-white text-4xl font-bold">{user.name}</div> {/* Render the user name */}

              <div className="flex gap-2">
                <button
                  onClick={showEditPopup}
                  className="text-xl hover:scale-110 transition-all duration-200 bg-[#0a430a] rounded-xl px-5 py-2 text-white"
                >
                  Edit Profile
                </button>
                <button className="text-xl hover:scale-110 transition-all duration-200 bg-[#0a430a] rounded-xl px-5 py-2 text-white" onClick={logout}>
                  Log out
                </button>
              </div>
            </div>
          )}
          <div className="text-white w-full text-center gap-4 flex flex-col text-3xl">
            All Posts
            <div className="w-full border border-[#747373]"></div>
            <div className="grid w-full">
              <div className="grid grid-cols-3 gap-5 mb-10">
                {
                  data.map(e=>{
                    return (
                      <Image
                        className="w-full h-full"
                        key={e.post_id}
                        src={`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${e.image_location}/preview?quality=75&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
                        width={300}
                        height={300}
                        alt="profile picture"
                      />
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/60">
          <EditProfile />
        </div>
      )}
    </div>
  );
};

export default Profile;
