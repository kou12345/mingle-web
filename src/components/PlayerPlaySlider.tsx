'use client';
import React, { useEffect, useRef, useState } from 'react';
import { MusicPlayButton } from './MusicPlayButton';
import { MusicSlider } from './MusicSlider';

type Props = {
  musicFileUrl: string | undefined;
};
export const PlayerPlaySlider = (props: Props) => {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [sliderCurrentTime, setSliderCurrentTime] = useState<number>(0);

  useEffect(() => {
    // timeupdate イベントのリスナーを設定
    const handleTimeUpdate = () => {
      if (audioElement.current) {
        setSliderCurrentTime(audioElement.current.currentTime);
      }
    };

    if (audioElement) {
      audioElement.current?.addEventListener('timeupdate', handleTimeUpdate);
    }

    // コンポーネントがアンマウントされたときにクリーンアップ
    return () => {
      if (audioElement) {
        audioElement.current?.removeEventListener(
          'timeupdate',
          handleTimeUpdate,
        );
      }
    };
  }, []);
  useEffect(() => {
    if (audioElement.current) {
      audioElement.current.currentTime = currentTime;
    }
  }, [currentTime]);
  return (
    <div className="flex flex-col items-center w-full h-full">
      <audio controls id="audioPlayer" ref={audioElement} className="hidden">
        <source src={props.musicFileUrl} type="audio/mp3" />
      </audio>
      <MusicPlayButton
        musicUrl={props.musicFileUrl}
        audioElement={audioElement}
      />
      <div className="w-3/4">
        <MusicSlider
          duration={audioElement.current?.duration}
          sliderCurrentTime={sliderCurrentTime}
          setCurrentTime={setCurrentTime}
          audioElement={audioElement}
        />
      </div>
    </div>
  );
};
