import { useState } from 'react';

type Props = {
  currentDisplayName?: string;
};

export const DisplayNameInput = ({ currentDisplayName = '' }: Props) => {
  const [displayName, setDisplayName] = useState<string>(currentDisplayName);
  // TODO バリデーション
  return (
    <div>
      <label htmlFor="displayName">
        表示名
        <input
          className="border"
          type="text"
          name="displayName"
          id="displayName"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
    </div>
  );
};
