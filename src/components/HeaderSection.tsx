'use server';

import { db } from '@/server/db';
import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { users } from 'drizzle/schema';
import { cookies } from 'next/headers';
import { Header } from './ui/Header';

// todo もっと良い名前はないか？
export const HeaderSection = async () => {
  // ログイン中のユーザーを取得
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('user: ', user);

  // ログイン中のユーザーのuserNameを取得
  const userName = await getUserName(user?.id as string);

  return <Header userName={userName} />;
};

const getUserName = async (userId: string): Promise<string | null> => {
  try {
    const result = await db.select().from(users).where(eq(users.id, userId));
    return result[0].userName;
  } catch (error) {
    console.log(error);
    return null;
  }
};
