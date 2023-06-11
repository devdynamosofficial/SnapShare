import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import React from 'react'
import appwriteClient from '@/libs/appwrite';
import { Storage } from 'appwrite';
import Sidebar from '../Sidebar';
import Contents from '../contents/Contents';

export default function MainLayout() {
    
  
    
    //console.log(photos);
    return (
        <>
            <Sidebar></Sidebar>
            <Contents></Contents>
        </>
      
          
      
    );
  }
