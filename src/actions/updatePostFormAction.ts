'use server';

import { createAvatarRepository } from '@/server/repository/avatar';
import { createProfileRepository } from '@/server/repository/profile';
import { createUserRepository } from '@/server/repository/user';
import { createProfileService } from '@/server/service/profile';
import { redirect } from 'next/navigation';
import 'server-only';

export async function updatePostFormAction(
  userName: string,
  formData: FormData,
): Promise<void> {
  const displayName = formData.get('displayName') as string;
  const overview = formData.get('overview') as string;
  const avatarFile = formData.get('avatarFile') as File;

  const ProfileService = createProfileService(
    createAvatarRepository(),
    createProfileRepository(),
    createUserRepository(),
  );

  // TODO validation
  const result = await ProfileService.editProfile(
    displayName,
    overview,
    avatarFile,
  );
  if (result.isFailure()) {
    // TODO 失敗した場合はどうする？
    console.log('Failed to edit profile');
    console.log(result.value);

    redirect(`/${userName}/edit`);
  }

  console.log('Success to edit profile');

  redirect(`/${userName}`);
}
