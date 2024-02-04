'use server';

import { createUser } from '@/server/user';
import { formActionResult, userNameSchema } from '@/types/types';
import { createAdminAuthClient } from '@/utils/supabase/adminAuthClient';
import { cookies } from 'next/headers';
import 'server-only';

export async function userNameFormAction(
  _prevState: formActionResult,
  formData: FormData,
): Promise<formActionResult> {
  console.log("LOG: formData.get('userName'): ", formData.get('userName'));
  // validation
  const validation = userNameSchema.safeParse(formData.get('userName'));

  if (!validation.success) {
    console.error(validation.error);
    return {
      success: false,
      message: 'userNameは英数字のみで1文字以上20文字以内で入力してください',
    };
  }

  const cookieStore = cookies();
  const supabase = createAdminAuthClient(cookieStore);

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw new Error(error.message);
    }

    if (!session) {
      throw new Error('ERROR: sessionがありません');
    }

    if (!session.user.email) {
      throw new Error('ERROR: emailがありません');
    }

    console.log('LOG: validation.data: ', validation.data);

    // userを作成する
    await createUser({
      id: session.user.id,
      userName: validation.data,
      email: session.user.email,
    });

    // useNameを作成したFlagをtrueにする
    const { error: userError } = await supabase.auth.admin.updateUserById(
      session.user.id,
      {
        user_metadata: {
          hasUserName: true,
        },
      },
    );

    if (userError) {
      throw new Error(userError.message);
    }

    return {
      success: true,
      message: 'userNameを登録しました',
    };
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return {
      success: false,
      message: 'userNameの登録に失敗しました',
    };
  }
}
