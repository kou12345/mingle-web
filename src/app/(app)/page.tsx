import { MusicCardList } from '@/components/MusicCardList';
import { Search } from '@/components/ui/Search';
import Loader from '@/components/ui/Loader';
import { Suspense } from 'react';
import { getPostsBySearchValue } from '@/server/post';

export default async function Page() {
  console.log('TOPページのpage.tsx');
  return (
    <div className="mx-auto w-11/12">
      <div className="my-6 ml-auto w-fit">
        <Search />
      </div>

      <div>
        <Suspense fallback={<Loader />}>
          <MusicCardList />
        </Suspense>
      </div>
    </div>
  );
}

// TODO Loading用のスケルトンを作る
