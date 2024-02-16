import React from 'react'
import { PostDetail } from '@/types/types';
import { MusicCard } from './ui/MusicCard';

type Props = {
    likes: PostDetail[]
}
export const Likedlist = async(props: Props) => {

  return (
    <div className="w-11/12 mx-auto">
        {props.likes.map((like) => (
            <MusicCard post={like} />
        ))}
    </div>
  )
}
