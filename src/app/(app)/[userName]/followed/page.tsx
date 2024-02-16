import { FollowedUserCard } from '@/components/ui/FollowedUserCard';
import profileImage from '../../../../../public/profImage.png';
import React from 'react';
import { getFollowListByUserName } from '@/server/follow';
import { FollowList } from '@/components/FollowList';

const page = async ({ params }: { params: { userName: string } }) => {
  const { userName } = params;
  const followedList = await getFollowListByUserName(userName);
  console.log(followedList);
  return (
    <div className="mx-auto w-11/12">
      <p className="mb-8 mt-5 font-bold text-[#646767]">followed</p>
      <FollowList userName={userName} />
    </div>
  );
};

export default page;
