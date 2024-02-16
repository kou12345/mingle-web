'use client';

import { PlayButton } from '@public/playButton';
import { StopButton } from '@public/stopButton';
import { useEffect, useRef, useState } from 'react';

type Props = {
  musicUrl: string | undefined;
  audioElement: React.RefObject<HTMLAudioElement>
};

export const MusicPlayButton = (props: Props) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const onClickFunc = () => {
    setIsPlay(!isPlay);
  };
  useEffect(() => {
    if (isPlay === true) {
      props.audioElement.current?.play();
    } else {
      props.audioElement.current?.pause();
    }
  }, [isPlay]);
  return (
    <div className="mt-6">
      {isPlay ? (
        <button
          onClick={() => {
            onClickFunc();
          }}
        >
          <StopButton />
        </button>
      ) : (
        <button
          onClick={() => {
            onClickFunc();
          }}
        >
          <PlayButton />
        </button>
      )}
    </div>
  );
};
