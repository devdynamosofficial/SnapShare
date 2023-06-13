import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import React from 'react'
import appwriteClient from '@/libs/appwrite';
import { Storage } from 'appwrite';
import Sidebar from '../Sidebar';
import Contents from '../contents/Contents';

export default function MainLayout(props) {

    return (
        <>
            <Sidebar user={props.user.currentAccount}></Sidebar>
            <Contents user={props.user}></Contents>
        </>
      
          
      
    );
  }
