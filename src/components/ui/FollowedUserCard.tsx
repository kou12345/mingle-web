import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';
import { FollowButton } from '../FollowButton';


type Props = {
  src: string;
  displayName: string;
  overview: string;
};

export const FollowedUserCard = (props: Props) => {
  return (
    <div className="h-32 w-full rounded-xl bg-[#E3DEDA] px-4 py-4 mb-6">
      <div>
        <div className="flex items-center">
          <Image
            src={props.src}
            width={100}
            height={100}
            alt=""
            className="h-11 w-11 rounded-full"
          />
          <p className="ml-3 text-xl font-bold text-[#646767]">{props.displayName}</p>
          <FollowButton userName={props.displayName}  />
        </div>
        <p className="text-xs text-[#646767] mt-2">{props.overview}</p>
      </div>
    </div>
  );
};
