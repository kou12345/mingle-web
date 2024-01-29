import { MusicCardList } from '@/components/MusicCardList'
import React from 'react'

const page = () => {
  return (
    <div className="w-11/12 mx-auto">
        <p className="mb-8 text-[#646767] text-xl font-bold mt-5">Likes</p>
        <MusicCardList />
    </div>
  )
}

export default page