import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import React from 'react'
import appwriteClient from '@/libs/appwrite';
import { Storage } from 'appwrite';
import Sidebar from '../Sidebar';
import Contents from '../contents/Contents';

export default function MainLayout() {
    const { currentAccount, isLoadingAccount } = useUser();
    const router = useRouter();
    const {logout}=useUser();
    const storage = new Storage(appwriteClient);
    //const photos=storage.listFiles('6480d7c2b7e583d5cf63');
    React.useEffect(() => {
      if (!currentAccount && !isLoadingAccount) {
        // If there is no account present and we finish the get account request redirect to login
        router.push('/auth/signin');
      }
    }, [currentAccount, router, isLoadingAccount]);
  
    
    //console.log(photos);
    return (
        <>
            <Sidebar></Sidebar>
            <Contents></Contents>
        </>
      
          
      
    );
  }
