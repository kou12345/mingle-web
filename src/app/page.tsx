'use server';

import { MusicCardList } from '@/components/MusicCardList';
import { Search } from '@/components/ui/Search';
import { Suspense } from 'react';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function Page() {
  return (
    <div className="w-11/12 mx-auto">
      <div className="w-fit ml-auto my-6">
        <Search />
      </div>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <MusicCardList />
        </Suspense>
      </div>
    </div>
  );
}

// TODO Loading用のスケルトンを作る
