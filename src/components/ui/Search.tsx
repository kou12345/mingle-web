"use client"

import Link from 'next/link';
import React, { useState } from 'react';

export const Search = () => {
  const [value, setValue] = useState<string>("")
  return (
    <div className="flex border border-[#646767] w-44 rounded">
      <input type="text" className="w-5/6 rounded focus:outline-none text-[#646767] px-2" onChange={(e) => {setValue(e.target.value)}} />
      <Link href={`/search/${value}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="humbleicons hi-search w-6 h-6 text-[#646767]"
        >
          <g
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" d="M20 20l-6-6" />
            <path d="M15 9.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
          </g>
        </svg>
      </Link>
    </div>
  );
};
