import { FollowButton } from '@/components/FollowButton';
import { db } from '@/server/db';
import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { follows, profiles, users } from 'drizzle/schema';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { getFollowListByUserName } from '@/server/follow';
import { FollowButtonForm } from './FollowButtonForm';

/*
TODO
フォロー解除をしたら、revalidatePathが実行されるため、フォロー解除したユーザーが表示されなくなる
*/
type Props = {
  userName: string;
};

export const FollowList = async (props: Props) => {
  // ログインしているユーザーのIDを取得
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user?.id);
  // ログインしているユーザーがフォローしているユーザーを取得
  const followList = await getFollowListByUserName(props.userName);
  return (
    <div>
      {followList.map((follow, index) => (
        <div key={index} className="w-full rounded-xl bg-[#E3DEDA] px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-3">
              <Image
                className="h-14 w-14 rounded-full object-cover"
                src={follow.avatarUrl}
                alt="icon"
                width={100}
                height={100}
                priority={true}
              />
              <p className="text-xl font-bold text-[#646767] ml-3">
                {follow.displayName}
              </p>
            </div>
            <FollowButtonForm displayName={follow.displayName} />
          </div>
          <p className="ml-2 text-[#646767] text-xs">{follow.overview}</p>
        </div>
      ))}
    </div>
  );
};
