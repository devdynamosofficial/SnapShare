'use client';
import Image from 'next/image'
import { Appwrite, Databases, ID } from 'appwrite';
import { useEffect,useRef, } from 'react';
import { Client, Storage } from 'appwrite';
import appwriteClient from '@/libs/appwrite';
import useUser from '@/hooks/useUser';

export default function Upload() {
  const {currentAccount}=useUser();
  const databases = new Databases(appwriteClient);
  const fileInputRef=useRef(null);
  const captionRef=useRef(null);
  return (
    <main>
      
      <div className='bg-slate-400 w-fit h-fit'>
        <input type='file' ref={fileInputRef}/>
      </div>

      <div>
        <input type='text' placeholder='caption' ref={captionRef}></input>
      </div>

      <div className='bg-blue-200 w-fit h-fit rounded-md '><button onClick={async ()=>{
          
          const storage = new Storage(appwriteClient);
          const file=fileInputRef.current.files[0];
          const captionValue=captionRef.current.value;
          const fileId=ID.unique();
          console.log(fileId);
          const promise = storage.createFile(
              '6480d7c2b7e583d5cf63',
              fileId,
              file
          );
          const photoId=await (promise);
          console.log(photoId);
          if(photoId){
            const create_document = databases.createDocument('648180968f5d208ac23b', '648180d90d7ee8ce4eaf',ID.unique() , {
              id:photoId.$id,
              userId:currentAccount.$id,
              url:`https://cloud.appwrite.io/v1/storage/buckets/6480d7c2b7e583d5cf63/files/${promise.$id}/view?project=6480d2c47d708d9490c9&mode=admin`
            });
          }
          
        if(captionValue!=''){
          const create_document=databases.createDocument('64832ce20f302dc79cda','64837e7ddc727db7a55a',photoId.$id,{
            user_id:currentAccount.$id,
            post_id:photoId.$id,
            caption:captionValue
          })
        }
          
      }}>Upload</button></div>
      
      
    </main>
  )
}
