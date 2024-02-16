'use client';
import React from 'react';
import { Session } from 'inspector';
import { useRouter } from 'next/navigation';

type Data = {
  session: Session | null;
};

type Props = {
  data?: Data | undefined;
};
export const FollowButton = (props: Props) => {
  const router = useRouter();
  return (
    <button
      className="h-9 w-20 rounded-md bg-[#646767] text-[#DDBFAE]"
      onClick={() => {
        if (props.data?.session === undefined || props.data.session === null) {
          router.push('/login');
        } else {
        }
      }}
    >
      follow
    </button>
  );
};
