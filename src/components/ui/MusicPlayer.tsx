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
    <div className="w-full rounded-xl bg-[#E3DEDA] mb-7">
      <div className="flex flex-col items-center">
        <div className="relative h-10 w-fit flex flex-col items-center mt-8">
          <p className="text-2xl font-bold text-[#646767] z-20 relative">
            夜もすがら君を想う
          </p>
          <label className="w-full h-7 bg-[#B3D0CF] block absolute top-3 rounded-xl"></label>
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
          <div className="flex w-full justify-between mb-3">
            <Tag text="tag" href="/player" />
            <button className="">
              <Like />
            </button>
          </div>
          <p className="text-xs text-[#646767] mb-6">
            概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要概要
          </p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <img
                src={profileImage.src}
                className="block w-11 h-11 rounded-full"
              />
              <p className="text-[#646767] font-bold ml-3">mocha</p>
            </div>
            <button className="w-16 h-8 bg-[#646767] text-[#DDBFAE] rounded-md">
              follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
