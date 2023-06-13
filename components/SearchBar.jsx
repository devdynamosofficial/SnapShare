import { MdPhotoLibrary } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { useAtom } from "jotai";
import SearchAtom from "@/atoms/SearchAtom";
import axios from "axios";
import { useEffect, useState } from "react";
import appwriteClient from "@/libs/appwrite";

import Image from "next/image";
import { Databases, ID, Query } from "appwrite";
import useUser from "@/hooks/useUser";

const SearchBar = () => {
  const {isLoadingAccount, currentAccount, isFriendListLoaded, friendsList}=useUser();
  const databases = new Databases(appwriteClient);

  const [searchbar, setSearchbar] = useAtom(SearchAtom);
  const [searchTerm, setSearchTerm] = useState("");

  var [people, setPeople] = useState([]);
  const [addedFriends, setAddedFriends] = useState([]);

  function addFriend(e, index){
    if(!isLoadingAccount){
        const databases=new Databases(appwriteClient);
        databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_FRIENDS_COLLECTION_ID, ID.unique(), {
            user_id: currentAccount.$id,
            friend_id: e.user_id,
            name: e.name
        }).then(response=>{
            people[index].isFriend = true;
            setPeople(people.concat([0]))
        });
    }
}

  const handleAddFriend = (result) => {
    setAddedFriends([...addedFriends, result]);
  };
  const closeSearch = () => {
    setSearchbar(false);
    
  };

  async function searchPeople(n){
    if(!currentAccount){
      return null;
    }
    if(!isLoadingAccount && isFriendListLoaded){
        const databases = new Databases(appwriteClient);
        const promise = databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_USER_COLLECTION_ID,[
            Query.search("name", n)
        ]);

        try{
          var response = await promise;
          console.log(response.documents);
          const obj = response.documents.filter(e=>e.user_id!==currentAccount.$id).map
          (e=>(
            {
              "name": e.name,
              "age": e.age,
              "profile_pic": e.profile_pic,
              "profile_pic_url":`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${e.profile_pic}/preview?quality=50&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
              "user_id": e.user_id,
              "email":e.email,
              "isFriend": friendsList.documents.filter(f=>f.friend_id==e.user_id).length > 0
            }
          ));
          response.total == 0 ? setPeople(-1) : setPeople(obj);
        }catch(err){
          console.log(err);
        }
    }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm) {
      return; // Exit early if searchTerm is empty
    }
    try {

      await searchPeople(searchTerm);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="w-full md:w-[40%] mt-28 md:mt-10 gap-3 mx-auto flex flex-col justify-center items-end z-50">
        <div className="w-[100%] bg-white h-[70vh] md:h-[80vh] flex flex-col gap-8 text-black p-6 rounded-xl font-bold mx-auto">
          <div className="w-[100%] bg-white h-[60vh] relative flex flex-col gap-8 text-black p-6 rounded-xl font-bold mx-auto">
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full grid grid-cols-4">
                <input
                  onChange={handleChange}
                  type="text"
                  className="w-full col-span-3 rounded-s-xl outline-none px-4 py-2 border"
                  placeholder="Search Friends"
                />
                <button
                  type="submit"
                  className="col-span-1 bg-[#117711] text-white hover:bg-[#064d06] transition-all duration-150 rounded-e-xl"
                >
                  Search
                </button>
              </form>
            </div>
            
            <div className="w-full h-full overflow-y-auto flex flex-col gap-5">
              People found :<br></br>
              { (
                <div className="flex justify-between w-full items-center gap-5 p-4">
                  {people && people == -1 ?"No records found": (
                    
                    <div className="w-full flex flex-col gap-4">
                      {people && people == -1 ?"No records found": (
                    
                    <div className="w-full flex flex-col gap-4">
                      {people.map((result, index) => {
                        if(result == 0){
                          return ""
                        }
                        return (<div
                          key={index}
                          className="flex w-full justify-between items-center"
                        >
                          <div className="flex justify-between items-center gap-2">
                            <div className="rounded-full w-9 h-9">
                              <Image
                                src={result.profile_pic_url}
                                height={100}
                                width={100}
                                alt="pic"
                                className="w-full h-full rounded-full"
                              />
                            </div>
                            <br></br>
                            {result.name}
                            <br></br>
                            {result.email}
                          </div>
                          {result.isFriend ? (
                            <span className="bg-green-800/40 px-4 py-2 rounded-md">
                              Already Friends
                            </span>
                          ) :(
                            <button
                              className="bg-green-800 text-white px-4 py-2 rounded-md"
                              onClick={() => {addFriend(result, index)}}
                            >
                              Add Friend
                            </button>
                          ) }
                        </div>)
                      }
                      )}
                    </div>
                  )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="w-full md:mt-0 flex justify-end absolute right-[-51%] top-[-5%]">
              <AiFillCloseCircle
                onClick={closeSearch}
                className="text-black mx-auto flex cursor-pointer"
                size={30}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
