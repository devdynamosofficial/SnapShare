import Image from "next/image";

const DisplayExploreImage = ({img}) => {
  return (
    <>
          <div className="w-full h-[16vh] md:h-[65vh] justify-center items-center flex">
            <Image
              src={`https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${img.image_location}/preview?quality=10&project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
              className="w-[100%] md:w-[100%] h-[100%] md:h-[100%] rounded-2xl"
              height={900}
              width={900}
              alt={img.caption}
            />
          </div>
    </>
  );
};

export default DisplayExploreImage;
