'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function logoutAction() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // sign out
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error.message);
    // TODO error handling
  }
}
