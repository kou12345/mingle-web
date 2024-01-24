'use client';

import { useState } from 'react';

type Props = {
  userName: string;
};

export const DisplayNameInput = (props: Props) => {
  const [userName, setUserName] = useState<string>(props.userName);
  console.log('userName: ', userName);
  // TODO バリデーション
  return (
    <div>
      <label htmlFor="displayName">
        名前
        <input
          className="border"
          type="text"
          name="displayName"
          id="displayName"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
    </div>
  );
};
