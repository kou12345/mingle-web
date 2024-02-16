import React from 'react';
import profileImage from '../../../public/profImage.png';
import Image from 'next/image';

type Props = {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Comment = (props: Props) => {
  return (
    <div>
      <p className="text-[#646767] text-xl font-bold mb-4">Comment</p>
      <div className="flex border border-[#6E96A5] px-2 justify-center items-center rounded-xl h-14">
        <Image src={profileImage.src} className="block w-11 h-11 rounded-full" width={44} height={44} alt="profile" />
        <label
          className="w-full ml-3 text-[#646767] opacity-50"
          onClick={() => {
            props.setIsClick(!props.isClick);
          }}
        >
          コメントを書き込む
        </label>
      </div>
      <div className="flex mt-4">
        <Image
          src={profileImage.src}
          width={80}
          height={80}
          alt="profile"
          className="block w-11 h-11 rounded-full mr-2"
        />
        <div className="w-full">
          <p className="mb-1 text-[#646767] font-bold">chacha</p>
          <div className="border border-[#6E96A5] w-full min-h-14 rounded-md">
            <p className="w-11/12 mx-auto text-[#646767] text-xs my-3">
              コメントコメントコメントコメントコメントコメントコメントコメント
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
