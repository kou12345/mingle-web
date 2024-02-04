import { getUserNameByUserId } from '@/server/user';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Header } from './ui/Header';

export const HeaderSection = async () => {
  // ログイン中のユーザーを取得
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // ログイン中のユーザーのuserNameを取得
    const userName = await getUserNameByUserId({ userId: user.id });

    return <Header userName={userName} />;
  } else {
    return <Header />;
  }
};

// 新規ユーザーでログインしたときに即onboardingページに飛ばす
