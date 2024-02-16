'use client';

import { Camera } from '@public/camera';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  avatarUrl: string;
};

export const AvatarFileInput = (props: Props) => {
  const [avatarFile, setAvatarFile] = useState<string>(props.avatarUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setAvatarFile(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // TODO uploadした画像のプレビューを表示する
  // TODO 既存の画像を取得する
  // ! 現状、画像の入力をせずに、submitするとエラーになる

  return (
    <div className="relative">
      <label
        htmlFor="avatarFile"
        className="absolute left-0 top-0 flex h-20 w-20 items-center justify-center rounded-full bg-[#646767] opacity-60"
      >
        <Camera />
      </label>
      <Image
        src={avatarFile}
        alt="Current Avatar"
        width="100"
        height="100"
        className="object-cover w-20 h-20 rounded-full"
      />
      <input
        className="hidden"
        type="file"
        name="avatarFile"
        id="avatarFile"
        accept="image/*"
        onChange={(e) => {handleFileChange(e)}}
      />
    </div>
  );
};
