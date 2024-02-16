import { MusicCardList } from '@/components/MusicCardList'
import { SearchedMusicCard } from '@/components/SearchedMusicCardList'
import Loader from '@/components/ui/Loader'
import { Search } from '@/components/ui/Search'
import React, { Suspense } from 'react'

const page = ({
    params,
  }: {
    params: { searchValue: string };
  }) => {
    const tag = params.searchValue
  return (
    <div className="mx-auto w-11/12">
      <div className="my-6 ml-auto w-fit">
        <Search />
      </div>

      <div>
        <Suspense fallback={<Loader />}>
          <SearchedMusicCard tag={tag} />
        </Suspense>
      </div>
    </div>
  )
}

export default page