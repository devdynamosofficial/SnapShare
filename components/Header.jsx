import Image from "next/image";
import Link from "next/link";
import { CgLivePhoto } from "react-icons/cg";

const Header = () => {
    return (
        <>
            <div className="w-full grid md:hidden place-items-center grid-flow-col pt-3 gap-6 bg-[#001B00]/30 backdrop-blur-md fixed top-0">
            <Link
              href="/home"
              className="flex items-center gap-2 p-2 my-4 mb-5 text-white"
            >
              <CgLivePhoto size={32} />
              <div className="text-3xl font-bold pt-1">SnapShare</div>
            </Link>
            <Link href="/profile">
              <Image
                src="/man.jpg"
                height={50}
                width={50}
                alt="Profile"
                className="rounded-full cursor-pointer"
              />
            </Link>
          </div>
        </>
    );
}

export default Header;