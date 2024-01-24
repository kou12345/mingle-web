'use client';

import { useState } from 'react';

type Props = {
  overview: string;
};

export const OverviewInput = (props: Props) => {
  const [overview, setOverview] = useState<string>(props.overview);

  return (
    <label htmlFor="overview">
      自己紹介
      <textarea
        className="border"
        name="overview"
        id="overview"
        required
        value={overview}
        onChange={(e) => setOverview(e.target.value)}
      />
    </label>
  );
};
