import { MusicCardList } from '@/components/MusicCardList';
import { Search } from '@/components/ui/Search';
import { Suspense } from 'react';

export default function Page() {
  console.log('TOPページのpage.tsx');
  return (
    <div className="mx-auto w-11/12">
      <div className="my-6 ml-auto w-fit">
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
