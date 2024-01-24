'use client';

import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const MusicSlider = () => {
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

  return (
    <ThemeProvider theme={theme}>
      <Slider disabled defaultValue={30} aria-label="Disabled slider" />
    </ThemeProvider>
  );
};
