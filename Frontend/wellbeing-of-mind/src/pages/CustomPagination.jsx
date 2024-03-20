import * as React from 'react';
import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function CustomPagination({ articles, currentPage, handlePageChange}) {

  const darkTheme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          root: {
            button: {
              color: "#fff", // Change to the desired text color
            },
          },
        },
      },
    },
  });
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={1}>
        <MuiPagination
          count={Math.ceil(articles.length / 10 + 1)}
          page={currentPage}
          size="large"
          onChange={(event, value) => handlePageChange(value)} 
        />
      </Stack>
    </ThemeProvider>
  );
}
