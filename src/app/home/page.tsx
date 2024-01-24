import React from 'react';
import { Header } from '@/components/ui/Header';
import { MusicCard } from '@/components/ui/MusicCard';
import { Search } from '@/components/ui/Search';

const page = () => {
  const tagsTest = [
    {
      text: 'tag',
      url: '/test',
    },
  ];
  return (
    <div className="w-11/12 mx-auto">
      <div className="w-fit ml-auto my-6">
        <Search />
      </div>
      <div className="space-y-4 mx-auto">
        {[...Array(10)].map((_, i) => {
          return (
            <MusicCard
              key={i}
              musicName="aaa"
              userName="aaaa"
              musicDescription="aaaa"
              tags={tagsTest}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
