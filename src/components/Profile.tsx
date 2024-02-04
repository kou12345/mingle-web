import { getIsFollowing } from '@/server/follow';
import { getProfileByUserName } from '@/server/profile';
import { getUserNameByUserId } from '@/server/user';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { FollowButton } from './FollowButton';

type Props = {
  userName: string;
};

export const Profile = async (props: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
            <FollowButton userName={props.userName} isFollowing={isFollowing} />
          ) : (
            ''
          )}
        </div>
      </div>
      <p className="mb-5 text-xl font-bold text-[#646767]">
        {profile.displayName}
      </p>
      <p className="mb-7 text-xs text-[#646767]">{profile.overview}</p>

      {/* 自分のProfileなら編集ボタンを表示する */}
      {loggedUserName === props.userName ? (
        <Link className="border text-blue-500" href={`/${props.userName}/edit`}>
          編集
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};
