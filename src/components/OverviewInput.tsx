import { useState } from 'react';
import { validationOverView } from '@/types/types';

type Props = {
  overview: string;
};

export const OverviewInput = (props: Props) => {
  const [overview, setOverview] = useState<string>(props.overview);
  return (
    <label htmlFor="overview">
      <p className="text-xs text-[#646767] opacity-50">Description</p>
      <textarea
        className="border border-[#6E96A5] rounded-md h-32 w-full px-2 py-2 focus:outline-none text-[#646767]"
        name="overview"
        id="overview"
        required
        value={overview}
        onChange={(e) => {
          setOverview(e.target.value)
        }}
      />
    </label>
  );
};
