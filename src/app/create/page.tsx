import { Camera } from '@public/camera';
import profileImage from '@public/profImage.png';
import Image from 'next/image';

const page = () => {
  return (
    <div className="w-11/12 mx-auto">
      <p className="mb-8 text-[#646767] font-bold mt-5">create user</p>
      <div className="">
        <div className="flex justify-between mb-8">
          <label className="bg-[#646767] opacity-60 w-20 h-20 rounded-full absolute flex items-center justify-center">
            <Camera />
          </label>
          <Image
            width={80}
            height={80}
            src={profileImage.src}
            className="block w-20 h-20 rounded-full"
            alt="icon"
            priority={true}
          />
          <button className="w-20 h-8 bg-[#646767] text-[#DDBFAE] rounded-lg">
            create
          </button>
        </div>
        <p className="text-xs text-[#646767] opacity-50 font-bold">Name</p>
        <input
          type="text"
          placeholder="Name"
          className="border border-[#6E96A5] rounded-md w-full h-9 mb-12"
        />
        <p className="text-xs text-[#646767] opacity-50 font-bold">
          Description
        </p>
        <textarea
          placeholder="Description"
          className="border border-[#6E96A5] rounded-md w-full h-32"
        />
      </div>
    </div>
  );
};

export default page;
