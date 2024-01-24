'use client';

import React from 'react';
import profileImage from '../../../public/profImage.png';
import Follow from './follow';
import { MusicCard } from '@/components/ui/MusicCard';
import Link from 'next/link';
import { useState } from 'react';
import { Camera } from '@public/camera';

const page = () => {
  const tagsTest = [
    {
      text: 'tag',
      url: '/test',
    },
  ];
  const [isClick, setIsClick] = useState<boolean>(false);

  return (
    <>
      <div className="w-11/12 mx-auto mt-6">
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between mb-5">
            <img
              src={profileImage.src}
              className="block w-20 h-20 rounded-full"
            />
            <div className=" flex items-center">
              <button
                className="text-[#DDBFAE] bg-[#646767] w-16 h-8 rounded-md font-bold text-[12px]"
                onClick={() => {
                  setIsClick(true);
                }}
              >
                Follow
              </button>
            </div>
          </div>
          <p className="text-xl font-bold text-[#646767] mb-5">username</p>
          <p className="text-xs text-[#646767] mb-7">bio</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex justify-center space-x-20 mb-7">
            <Link href="/" className="text-[#646767] text-xl font-bold">
              Posts
            </Link>
            <Link href="/" className="text-[#646767] text-xl font-bold">
              Likes
            </Link>
          </div>
          <div className="space-y-4">
            <MusicCard
              musicName="aaa"
              userName="aaa"
              musicDescription="aaa"
              tags={tagsTest}
            />
            <MusicCard
              musicName="aaa"
              userName="aaa"
              musicDescription="aaa"
              tags={tagsTest}
            />
            <MusicCard
              musicName="aaa"
              userName="aaa"
              musicDescription="aaa"
              tags={tagsTest}
            />
          </div>
        </div>
      </div>
      {isClick === true ? (
        <div className="flex justify-center fixed w-full h-[100vh] top-0">
          <label
            className="w-[100vh] h-[100vh] bg-black opacity-20 fixed z-20"
            onClick={() => {
              setIsClick(false);
            }}
          ></label>
          <div className="flex w-11/12 h-1/2 bg-white z-30 relative top-44 rounded-xl justify-center">
            <div className="w-full mt-8 mx-5">
              <div className="flex items-center justify-between mb-8">
                <label className="bg-[#646767] opacity-60 w-20 h-20 rounded-full absolute flex items-center justify-center">
                  <Camera />
                </label>
                <img
                  src={profileImage.src}
                  className="block w-20 h-20 rounded-full"
                />
                <button className="text-[#DDBFAE] bg-[#646767] w-16 h-8 rounded-md font-bold text-[12px] ">
                  Save
                </button>
              </div>
              <div>
                <p className="text-xs text-[#646767] opacity-50 font-bold">
                  Name
                </p>
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-[#6E96A5] rounded-md w-full h-9 mb-1 px-2 py-2"
                />
              </div>
              <div>
                <p className="text-xs text-[#646767] opacity-50 font-bold">
                  Description
                </p>
                <textarea
                  placeholder="Description"
                  className="border border-[#6E96A5] rounded-md w-full h-32 px-2 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default page;
