import Image from "next/image";

const DisplayExploreImage = ({img}) => {
  return (
    <>
          <div className="w-full h-[16vh] md:h-[65vh] justify-center items-center flex">
            <Image
              src={img.picture.large}
              className="w-[100%] md:w-[100%] h-[100%] md:h-[100%] rounded-2xl"
              height={900}
              width={900}
              alt="profile pic"
            />
          </div>
    </>
  );
};

export default DisplayExploreImage;
