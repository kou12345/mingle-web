'use client';
import * as React from 'react';
import { Search } from '@/components/ui/Search';
import { Comment } from '@/components/ui/Comment';
import { MusicPlayer } from '@/components/ui/MusicPlayer';
import { useState } from 'react';

export default function ContinuousSlider() {
  const [isClick, setIsClick] = useState<boolean>(false);
  React.useEffect(() => {
    console.log(isClick);
  }, [isClick]);
  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="my-6 ml-auto w-fit">
          <Search />
        </div>
        <MusicPlayer />
        <Comment isClick={isClick} setIsClick={setIsClick} />
      </div>
      {isClick ? (
        <div className="flex items-center justify-center">
          <label
            className="w-[100vh] h-[100vh] bg-black opacity-20 top-0 fixed z-20"
            onClick={() => {
              setIsClick(false);
            }}
          ></label>
          <div className="flex flex-col bg-white w-2/3 h-80 z-30 fixed top-44 items-center rounded-xl">
            <div className="w-4/5 flex flex-col items-end">
              <button className="w-16 h-8 bg-[#646767] rounded-md text-[#DDBFAE] mt-7 mb-6">
                send
              </button>
              <textarea
                placeholder="コメントを書き込む"
                className="w-full h-44 rounded-lg border border-[#6E96A5] py-3 px-2 placeholder:text-xs focus:outline-none text-[#646767] text-xs"
              />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
