import { CgLivePhoto } from "react-icons/cg";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Card from "./Card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Content } from "next/font/google";
import Contents from "./contents/Contents";
import MainLayout from "./Layouts/MainLayout";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import appwriteClient from '@/libs/appwrite';

const Home = () => {
  const { currentAccount, isLoadingAccount } = useUser();
    const router = useRouter();
    
   
    
    React.useEffect(() => {
      if (!currentAccount && !isLoadingAccount) {
        // If there is no account present and we finish the get account request redirect to login
        router.push('/');
      }
    }, [currentAccount, router, isLoadingAccount]);
  return (
    <>
      <div className="flex max-w-full md:mt-0 relative">
        <MainLayout></MainLayout>
      </div>
    </>
  );
};

export default Home;
