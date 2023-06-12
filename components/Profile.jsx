import Image from "next/image";
import Sidebar from "./Sidebar";
import { useAtom } from "jotai";
import EditAtomState from "@/atoms/EditAtom";
import EditProfile from "./EditProfile";
import ProfilePictureAtom from "@/atoms/ProfilePictureAtom";
import HobbyAtom from "@/atoms/HobbyAtom";
import FileAtom from "@/atoms/FileAtom";

const Profile = () => {
  const [file, setFile] = useAtom(FileAtom);
  const [hobby, setHobby] = useAtom(HobbyAtom);
  const [uploadProfilePic, setUploadProfilePic] = useAtom(ProfilePictureAtom);
  const [showEdit, setShowEdit] = useAtom(EditAtomState);
  const showEditPopup = () => {
    setShowEdit(true);
  };
  console.log("showEdit:", showEdit);

  return (
    <div className="flex max-w-full md:mt-0 relative">
      <Sidebar />
      <div className="md:ml-[20%] w-full mx-auto flex flex-col justify-center gap-12 items-center p-10 md:mt-4">
        <div className="flex flex-col mx-auto items-center gap-24">
          {uploadProfilePic && file ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full">
                <Image
                  className="w-full h-full rounded-full"
                  src={URL.createObjectURL(file)}
                  width={300}
                  height={300}
                  alt="profile picture"
                />
              </div>
              <div className="text-white text-4xl font-bold">John Doe</div>
              <div className="text-slate-500 font-medium text-2xl">
                I am a {hobby}
              </div>
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
              <div className="w-28 h-28 rounded-full">
                <Image
                  className="w-full h-full rounded-full"
                  src="/man.jpg"
                  width={300}
                  height={300}
                  alt="profile picture"
                />
              </div>
              <div className="text-white text-4xl font-bold">John Doe</div>
              <div className="text-slate-500 font-medium text-2xl">
                I am a Photographer
              </div>
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
          )}
          <div className="text-white w-full text-center gap-4 flex flex-col text-3xl">
            All Posts
            <div className="w-full border border-[#747373]"></div>
            <div className="grid w-full">
              <div className="grid grid-cols-3 gap-5 mb-10">
                <Image
                  className="w-full h-full"
                  src="/man.jpg"
                  width={300}
                  height={300}
                  alt="profile picture"
                />
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