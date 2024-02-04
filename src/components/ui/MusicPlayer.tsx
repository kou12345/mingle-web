import { Tag } from '@/components/ui/Tag';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Like } from '@public/like';
import { PlayButton } from '@public/playButton';
import { StopButton } from '@public/stopButton';
import { useState } from 'react';
import profileImage from '../../../public/profImage.png';

export const MusicPlayer = () => {
  const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          track: {
            '&.MuiSlider-track': {
              backgroundColor: '#565656', // トラックの色
              border: 'none',
              opacity: 1,
            },
          },
          thumb: {
            color: '#565656', // スライダーのつまみの色
          },
          rail: {
            '&.MuiSlider-rail': {
              backgroundColor: '#565656', // レール（トラックの裏側）の色
              opacity: 1, // レール（トラックの裏側）の色
            },
          },
        },
      },
    },
  });
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const onClickFunc = () => {
    setIsPlay(!isPlay);
  };
  return (
    <div className="mb-7 w-full rounded-xl bg-[#E3DEDA]">
      <div className="flex flex-col items-center">
        <div className="relative mt-8 flex h-10 w-fit flex-col items-center">
          <p className="relative z-20 text-2xl font-bold text-[#646767]">
            夜もすがら君を想う
          </p>
          <label className="absolute top-3 block h-7 w-full rounded-xl bg-[#B3D0CF]"></label>
        </div>
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
        <div className="w-3/4">
          <ThemeProvider theme={theme}>
            <Slider disabled defaultValue={30} aria-label="Disabled slider" />
          </ThemeProvider>
        </div>
        <div className="w-5/6">
          <div className="mb-3 flex w-full justify-between">
            <Tag text="tag" />
            <button className="">
              <Like />
            </button>
          </div>
          <p className="mb-6 text-xs text-[#646767]">
            概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要
          </p>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={profileImage.src}
                className="block h-11 w-11 rounded-full"
              />
              <p className="ml-3 font-bold text-[#646767]">mocha</p>
            </div>
            <button className="h-8 w-16 rounded-md bg-[#646767] text-[#DDBFAE]">
              follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
