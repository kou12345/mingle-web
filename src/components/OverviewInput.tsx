import { useState } from 'react';

type Props = {
  currentOverview?: string;
};

export const OverviewInput = ({ currentOverview = '' }: Props) => {
  const [overview, setOverview] = useState<string>(currentOverview);

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
