'use client';

import { PlayButton } from '@public/playButton';
import { StopButton } from '@public/stopButton';
import { useState } from 'react';

export const MusicPlayButton = () => {
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const onClickFunc = () => {
    setIsPlay(!isPlay);
  };
  return (
    <div className="mt-6">
      {isPlay ? (
        <button
          onClick={() => {
            onClickFunc();
          }}
        >
          <PlayButton />
        </button>
      ) : (
        <button
          onClick={() => {
            onClickFunc();
          }}
        >
          <StopButton />
        </button>
      )}
    </div>
  );
};
