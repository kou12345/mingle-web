'use server';

import { createProfile } from '@/server/profile';
import { formActionResult, profileSchema } from '@/types/types';
import { createAdminAuthClient } from '@/utils/supabase/adminAuthClient';
import { cookies } from 'next/headers';

// プロフィールを作成する onboardingの時に使う
export const createProfileFormAction = async (
  userId: string,
  _prevState: formActionResult,
  formData: FormData,
): Promise<formActionResult> => {
  console.log('START profileFormAction');
  // validation
  const validation = profileSchema.safeParse({
    userId,
    displayName: formData.get('displayName'),
    overview: formData.get('overview'),
    avatarFile: formData.get('avatarFile'),
  });

  if (!validation.success) {
    console.log('ERROR: validation error');
    return {
      success: false,
      message: validation.error.message,
    };
  }

  const cookieStore = cookies();
  const supabase = createAdminAuthClient(cookieStore);

  try {
    // profileを作成する
    await createProfile({
      userId,
      displayName: validation.data.displayName,
      overview: validation.data.overview,
      avatarFile: validation.data.avatarFile,
    });

    // profileを作成したFlagをtrueにする
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        hasProfile: true,
      },
    });

    if (error) {
      console.error(error instanceof Error ? error.message : error);
      throw new Error('ERROR: user_metadata.hasProfileの更新に失敗しました');
    }

    return {
      success: true,
      message: 'プロフィールを作成しました',
    };
    /*
    ? プロフィールを作成した時点で、userName, Profileは作成されている
    ここで、/にredirectしても良いのでは？
    clientにプロフィールが作成されたことを通知して、ユーザーのアクション後にredirectしたい

    */
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return {
      success: false,
      message: 'プロフィールの作成に失敗しました',
    };
  }
};
