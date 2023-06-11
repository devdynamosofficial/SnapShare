import { CgLivePhoto } from "react-icons/cg";
import Image from "next/image";
import Sidebar from "./Sidebar";
import Card from "./Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Content } from "next/font/google";
import Contents from "./contents/Contents";
import MainLayout from "./Layouts/MainLayout";

const Home = () => {
  
  return (
    <>
      <div className="flex max-w-full md:mt-0 relative">
        <MainLayout></MainLayout>
      </div>
    </>
  );
};

export default Home;
