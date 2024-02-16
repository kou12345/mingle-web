'use client';

import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Props = {
  duration: number | undefined
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  sliderCurrentTime: number | undefined
  audioElement: React.RefObject<HTMLAudioElement>
}
export const MusicSlider = (props: Props) => {
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

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if(typeof value === "number") {
      props.setCurrentTime(value)
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <Slider defaultValue={0} min={0} max={props.duration} aria-label="Disabled slider" value={props.sliderCurrentTime} onChange={handleSliderChange} />
    </ThemeProvider>
  );
};
