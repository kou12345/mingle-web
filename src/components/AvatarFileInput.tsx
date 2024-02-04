import Image from 'next/image';
import { useState } from 'react';

type Props = {
  currentAvatarUrl?: string;
};

export const AvatarFileInput = ({ currentAvatarUrl = '' }: Props) => {
  const [avatarFile, setAvatarFile] = useState<File>();
  console.log('avatarFile: ', avatarFile);

  // TODO uploadした画像のプレビューを表示する
  // TODO 既存の画像を取得する
  // ! 現状、画像の入力をせずに、submitするとエラーになる

  return (
    <div>
      <div>アイコン</div>
      <Image
        src={currentAvatarUrl}
        alt="Current Avatar"
        width="100"
        height="100"
      />
      <label htmlFor="avatarFile">
        アイコン
        <input
          type="file"
          name="avatarFile"
          id="avatarFile"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setAvatarFile(e.target.files[0]);
            }
          }}
        />
      </label>
    </div>
  );
};
