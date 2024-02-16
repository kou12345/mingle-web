import { getIsFollowing } from '@/server/follow';
import { getProfileByUserName } from '@/server/profile';
import { getUserNameByUserId } from '@/server/user';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { FollowButton } from './FollowButton';
import { Session } from 'inspector';


type Data = {
  session: Session | null;
};

type Props = {
  userName: string;
};

export const Profile = async (props: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const data = (await getSession()) as Data;

  const profile = await getProfileByUserName(props.userName);
  // TODO エラー処理

  // ログインしているユーザーの情報を取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isFollowing = false;
  let loggedUserName = '';
  if (user) {
    // フォロー済みか取得
    isFollowing = await getIsFollowing({
      followerId: user.id,
      targetUserName: props.userName,
    });

    // ログインしているユーザーの名前を取得
    loggedUserName = await getUserNameByUserId({
      userId: user.id,
    });
  }

  return (
    <div className="mx-auto w-11/12">
      <div className="mb-5 flex justify-between">
        <Image
          className="block h-20 w-20 rounded-full object-cover"
          src={profile.avatarUrl}
          alt="icon"
          width={100}
          height={100}
          priority={true}
        />
        <div className="flex items-center">
          {/* 自分のProfileならFollowButtonを表示しない */}

          {loggedUserName !== props.userName ? (
            <FollowButton userName={props.userName} isFollowing={isFollowing} data={data} />
          ) : (
            <Link
              className="flex h-8 w-16 items-center justify-center rounded-md bg-[#646767] text-[12px] font-bold text-[#DDBFAE]"
              href={`/${props.userName}/edit`}
            >
              Edit
            </Link>
          )}
        </div>
      </div>
      <p className="mb-5 text-xl font-bold text-[#646767]">
        {profile.displayName}
      </p>
      <p className="mb-7 text-xs text-[#646767]">{profile.overview}</p>
    </div>
  );
};

const getSession = async () => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data } = await supabase.auth.getSession();
    return data;
  } catch (error) {
    console.log(error)
  }
};
