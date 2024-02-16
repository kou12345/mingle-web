import { useState } from 'react';

type Props = {
  displayName: string;
};

export const DisplayNameInput = (props: Props) => {
  const [userName, setUserName] = useState<string>(props.displayName);
  console.log('userName: ', userName);

  // TODO バリデーション
  return (
    <div>
      <label htmlFor="displayName">
        <p className="text-xs text-[#646767] opacity-50">Name</p>
        <input
          className="h-9 w-full rounded-md border border-[#6E96A5] px-2 py-2 text-[#646767] focus:outline-none"
          type="text"
          name="displayName"
          id="displayName"
          required
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </label>
    </div>
  );
};
