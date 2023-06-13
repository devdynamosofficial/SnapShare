import useUser from "@/hooks/useUser";
import { useState, useEffect, useRef } from "react";
import appwriteClient from "@/libs/appwrite";
import { Account, Databases, ID, Query } from "appwrite";

const search = () => {
    const {isLoadingAccount, currentAccount, isFriendListLoaded, friendsList}=useUser();
    var name = useRef(null);
    var [people, setPeople] = useState([]);

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

    async function searchPeople(n){
        if(!isLoadingAccount && isFriendListLoaded){
            const databases = new Databases(appwriteClient);
            const promise = databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_USER_COLLECTION_ID,[
                Query.search("name", n)
            ]);

            try{
              var response = await promise;
              const obj = response.documents.filter(e=>e.user_id!==currentAccount.$id).map(e=>(
                {
                  "name": e.name,
                  "age": e.age,
                  "propile_pic": e.propile_pic,
                  "user_id": e.user_id,
                  "isFriend": friendsList.documents.filter(f=>f.friend_id==e.user_id).length > 0
                }
              ));
              response.total == 0 ? setPeople(-1) : setPeople(obj);
            }catch(err){
              console.log(err);
            }
        }
    }

    return (
    <div className="flex justify-center items-center h-screen w-screen">
        <div className="container w-[70%] h-[90%] bg-white">
            <form className="p-2 flex" onSubmit={(e)=>{e.preventDefault();searchPeople(name.current.value)}}>
                <input type="text" ref={name} name="search" placeholder="search by name" className="w-full border-2 border-black p-4" />
                <button type="submit" className="border-2 border-black p-4">Search</button>
            </form>
            <div className="space-y-4">
                People found: <br/>
                {
                    people && people == -1 ? "No Records Founds" : people.map((e, i)=>{
                        return e==0 ? "" : (
                            <div className="bg-blue-200 flex" key={e.user_id}>
                                <div className="w-full">
                                    Name: {e.name} <br/>
                                    User ID: {e.user_id}
                                </div>
                                {
                                    e.isFriend ? ("already friends") : (<button type="button" className="border-2 border-black bg-white" onClick={()=>{addFriend(e, i)}}>Add Friend</button>)
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    </div>
    );
}

export default search;