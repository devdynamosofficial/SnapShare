import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CgLivePhoto } from 'react-icons/cg';
import Card from '../Card';
import { Databases, Query } from 'appwrite';
import appwriteClient from '@/libs/appwrite';
import Header from '@/components/Header'
import { Router, useRouter } from 'next/router';
import { useAtom } from "jotai";
import counterAtom from "@/atoms/counterAtom";

let post_fetch_count = 0, noPost = false, isFetching = false, isLoadedOnLoad;

export default function Contents(props) {
  const router=useRouter();
  const [counter,setCounter]=useAtom(counterAtom);
  //router.push('/home');
  const [data, setData] = useState([]);
  const { isLoadingAccount, currentAccount, isFriendListLoaded, friendsList } = props.user;
  useEffect(() => {
    const databases = new Databases(appwriteClient);
    if(!isLoadingAccount){
      if(counter>0){
        setCounter(0);
        router.reload();
        
      }
      fetchPost();
      fetchMyPosts();
      setCounter(1);
    }
    async function fetchMyPosts(){
      var limit = 5;
      var post_promise = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_POST_COLLECTION_ID, [
        Query.equal("user_id", [currentAccount.$id]),
        Query.limit(limit),
        Query.orderDesc("creation_time")
      ]);
      setData(d=>d.concat(post_promise.documents));
    }
    async function fetchPost(){
      var limit = 5;
      if(!noPost){
        isFetching = true;
        var friends_w_posts = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_FRIENDS_COLLECTION_ID, [
            Query.equal("user_id", [currentAccount.$id]),
            Query.greaterThan("latest_post_count", 0),
            Query.limit(limit),
            Query.offset(post_fetch_count*limit)
          ]);
        if(friends_w_posts.total<7){
          friends_w_posts = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_FRIENDS_COLLECTION_ID, [
            Query.equal("user_id", [currentAccount.$id]),
            Query.limit(limit),
            Query.offset(post_fetch_count*limit)
          ]);
        }
        if(friends_w_posts.total>0){
          post_fetch_count++;
          var post_promise;
          for(var i = 0;i < friends_w_posts.documents.length;i++){
            var friend_id = friends_w_posts.documents[i].friend_id;
            post_promise = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_POST_COLLECTION_ID, [
              Query.equal("user_id", [friend_id]),
              Query.limit(100),
              Query.orderDesc("creation_time")
            ]);
            if(post_promise.total>0){
              setData(d=>d.concat(post_promise.documents));
            }
          } 
          isFetching = false;
        }else{
          noPost = true;
        }
    }
    }
    document.onscroll = (e)=>{
      let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        let modifier = 200; 
        if(currentScroll + modifier > documentHeight) {
          if(!isFetching){
            fetchPost();
          }
        }
    }
  
  }, [isLoadingAccount])
  

  return (
    <div className="md:ml-[20%] w-full mx-auto flex flex-col justify-center gap-12 items-center p-10 md:mt-4">
          <div className="w-full grid md:hidden place-items-center grid-flow-col pt-3 gap-6 bg-[#001B00]/30 backdrop-blur-md fixed top-0">
           <Header/>
          </div>
          <div className="flex flex-col gap-6 w-full mt-20">
            {data.sort((a, b)=>{console.log(typeof b.creation_time);return (new Date(b.creation_time) - new Date(a.creation_time));}).map((d) => {
              return <Card key={d.$id} user={props.user} info={d} />;
            })}
          </div>
        </div>
  )
}
