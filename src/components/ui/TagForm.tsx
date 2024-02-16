import React, { useEffect, useState } from 'react';

export const TagForm = () => {
    const [tags, setTags] = useState<string[]>([])

    const findTags = (tags: string) => {
        const pattern = /#\S+/g
        const matches = tags.match(pattern); // マッチングを実行
        const matchesArray: string[] = matches ? Array.from(matches) : [];
        setTags(matchesArray)
    }

    useEffect(() => {
        console.log(tags)
    },[tags])


  return (
    <div className="mb-6">
      <p className="text-xs text-[#646767] opacity-50">タグ</p>
      <input
        className="h-10 w-full rounded-md border border-[#6E96A5] bg-transparent  px-2 text-xs text-[#646767] focus:outline-none"
        type="text"
        id="tags"
        name="tags"
        onChange={(e) => {
            findTags(e.target.value)
        }}
        required
      />
    </div>
  );
};
